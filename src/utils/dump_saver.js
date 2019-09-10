const { merge } = require("./system")
const homedir = merge(require('os').homedir(), ".mc_bootstrap");
const fs = require("fs");

exports.save = (config, name) => {
    const path = merge(homedir, `${name}.json`);
    fs.writeFileSync(path, JSON.stringify(config));
}
exports.load = (name) => {
    const path = merge(homedir, `${name}.json`);
    if(!fs.existsSync(path)) {
        return null;
    }
    const content = fs.readFileSync(path, "UTF8")
    return JSON.parse(content);
}