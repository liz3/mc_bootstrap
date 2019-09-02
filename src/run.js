const { absoluteFolder, merge, getEula } = require("./utils/system");
const manager = require("./manager");
const md5 = require("md5");
const { startServerWithPipes } = require("./utils/serverUtils");
const fs = require("fs");
const propsValid = props => {
  for (key of Object.keys(props)) {
    if (props[key] === null) {
      console.log("Arg Value is null for " + key);
      return false;
    }
  }
  return true;
};
module.exports = (args, wd) => {
  const props = {
    dir: null,
    javaCmd: "java",
    jvmArgs: [],
    watchers: [],
    fileName: null
  };
  args.forEach((arg, index) => {
    if (arg === "--dir" || arg === "-d") {
      if (args[index + 1]) props.dir = absoluteFolder(args[index + 1]);
    }
    if (arg === "--bin" || arg === "-b") {
      if (args[index + 1]) props.javaCmd = args[index + 1];
    }
    if (arg === "--file" || arg === "-f") {
      if (args[index + 1]) props.fileName = absoluteFolder(args[index + 1]);
    }
    if (arg === "--watch" || arg === "-w") {
      props.watchers.push({
        file: absoluteFolder(args[index + 1]),
        out: absoluteFolder(args[index + 2]),
        cmd: args[index + 3],
        md5Previous: null
      });
    }
    if (arg === "--jvm" || arg === "-j") {
      if (args[index + 1]) props.jvmArgs.push(args[index + 1]);
    }
  });
  if (propsValid(props)) {
    console.log(`starting server ${props.fileName} in ${props.dir}`);
    let server = startServerWithPipes(
      props.javaCmd,
      props.dir,
      props.fileName,
      [],
      props.jvmArgs
    );
    for (watch of props.watchers) {
      console.log(`Adding Watcher for ${watch.file}`);
      fs.watch(watch.file, (event, filename) => {
        if (filename && event === "change") {
          if (!fs.existsSync(watch.file)) return;
          const currentMd5 = md5(fs.readFileSync(watch.file));
          if (currentMd5 === watch.md5Previous) return;
          watch.md5Previous = currentMd5;
          restarting = true;
          console.log(`${filename} file Changed`);
          fs.copyFileSync(watch.file, watch.out);
          if (watch.cmd === "restart") {
            console.log("Restarting server...");
            server.kill();
            setTimeout(() => {
              server = startServerWithPipes(
                props.javaCmd,
                props.dir,
                props.fileName,
                [],
                props.jvmArgs
              );
              manager.server = server;
            }, 250);
          } else {
            server.stdin.write(`${watch.cmd}\n`);
          }
        }
      });
    }
    manager.server = server;
  }
};
