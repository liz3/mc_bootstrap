const axios = require("axios");
const fs = require("fs");
const { base_cdn } = require("../config");
const { merge } = require("./system")
const homedir = merge(require('os').homedir(), ".mc_bootstrap")
module.exports = (version, folder) => {
    return new Promise((resolve,reject) => {
        if(!fs.existsSync(homedir)) fs.mkdirSync(homedir)
        if(fs.existsSync(merge(homedir, `spigot-${version}.jar`))) {
            fs.copyFileSync(merge(homedir, `spigot-${version}.jar`),merge(folder, `spigot-${version}.jar`))
            resolve();
            return;
        }
        axios.get(`${base_cdn}/spigot/spigot-${version}.jar`, {responseType: 'stream'}).then(res => {
            (async() => {
                const inStream = await res.data;
                const stream = fs.createWriteStream(merge(homedir, `spigot-${version}.jar`))
                stream.on("close", () => {
                    fs.copyFileSync(merge(homedir, `spigot-${version}.jar`),merge(folder, `spigot-${version}.jar`))
                    resolve();
                });
                inStream.pipe(stream);
            })();
        })
    })
}