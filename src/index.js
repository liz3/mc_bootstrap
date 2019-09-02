const config = require("./config");
const systemUtils = require("./utils/system");
const builder = require("./builder");
const run = require("./run");
console.log(`Starting MC_Bootstrap ${config.version}, ${systemUtils.getWd()}`);
const args = process.argv.slice(2);
const help = () => {
  console.log("MC Bootstrap help");
  console.log("Usage: mc-bootstrap build/run/help [...args]");
  console.log(`\tbuild`);
  console.log(
    `\t\t--out,-o PATH : Define the directoy where the server will be created`
  );
  console.log(
    `\t\t--server,-s VERSION : Define the server version, can be one of ${config.server_versions.join(
      ","
    )}`
  );
  console.log(
    `\t\t--bin,-b PATH(default to "java") : Define the java start executable (only for running)`
  );
  console.log(
    `\t\t--force,-f true/false: Force create, otherwise action will be aborted should the server directory exist`
  );
  console.log(`\tRun`);
  console.log(`\t\t--dir,-d PATH : Define the directoy where the server root is`);
  console.log(`\t\t--bin,-b PATH(default to "java") : Define the java start executable`);
  console.log(`\t\t--file,-f PATH : Define the server exeutable`);
  console.log(
    `\t\t--watch,-w : Define a file to be watched, this option is followed by 3 arguments, file(The file to be watch), dest(the destination file) and cmd()\n\t\t\tExample: -w myproject/build/plugin.jar myserver/plugins/plugin.jar restart\n\t\t\tActions: restart will perform a server restart, while anything else will only run the specified command`
  );
  console.log(`\t\t--jvm,-j PARAM : Adds the following param to the JVM start args`);
};
if (args.length === 0) {
  console.log("No arguments provided!");
} else {
  switch (args[0]) {
    case "build": {
      builder(args.slice(1), systemUtils.getWd());
      break;
    }
    case "run": {
      run(args.slice(1), systemUtils.getWd());
      break;
    }
    case "help": {
      help();
      break;
    }
    default: {
      console.log("Ilegal action");
      help();
    }
  }
}