const { server_versions } = require("./config");
const { absoluteFolder, merge, getEula } = require("./utils/system");
const downloader = require("./utils/downloader");
const manager = require("./manager")
const { startServerWithPipes } = require("./utils/serverUtils")
const fs = require("fs");
const propsValid = (props) => {
    for(key of Object.keys(props)) {
        if(props[key] === null){
            console.log("Arg Value is null for " + key);
            return false
        }
        if(key === "version" && !server_versions.includes(props[key])) {
            console.log(`Unkown server version ${props[key]}`);
            return false;
        }
    }
    return true;
}
module.exports = (args, pwd) => {
    console.log(args);
    const props ={
        dir: null,
        version: server_versions[0],
        javaCmd: "java",
        force: false
    }
    args.forEach((arg, index) => {
        if(arg === "--out" || arg === "-o") {
            if(args[index + 1]) props.dir = absoluteFolder(args[index + 1]);
        }
        if(arg === "--server" || arg === "-s") {
            if(args[index + 1]) props.version = args[index + 1];
        }
        if(arg === "--bin" || arg === "-b") {
            if(args[index + 1]) props.javaCmd = args[index + 1];
        }
        if(arg === "--force" || arg === "-f") {
            if(args[index + 1]) props.force = args[index + 1] === "true";
        }
    })
    if(propsValid(props)) {
        (async() => {
        console.log("Creating folder")
        if(fs.existsSync(props) && !props.force) {
            console.log("Folder already exists, aborting");
            return;
        }
         fs.mkdirSync(props.dir, {recursive: true});
         console.log(`Downloading Spigot ${props.version}`);
        await downloader(props.version, props.dir)
        console.log("writing eula");
        fs.writeFileSync(merge(props.dir, "eula.txt"), getEula())
        const os = process.platform;
        console.log("writing start script")
        if(os === "win32") {
            fs.writeFileSync(merge(props.dir, "start.bat"), `@echo off\n${props.javaCmd} -jar spigot-${props.version}.jar\nPAUSE`)
        } else {
            fs.writeFileSync(merge(props.dir, "start.sh"), `#!/bin/sh\n${props.javaCmd} -jar spigot-${props.version}.jar`)
        }
        process.stdout.write("Start server ? (Y/N): ")
        process.stdin.resume();
        process.stdin.once("data", (chunk) => {
            process.stdin.pause();
          if(chunk.toString("utf8").toLowerCase().startsWith("y")) {
              console.log(`starting server ${props.version} in ${props.dir}`)
            manager.server = startServerWithPipes(props.javaCmd, props.dir, `spigot-${props.version}.jar`)
          }
        })
        })();
    }
}