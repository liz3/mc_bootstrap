const path = require('path');

exports.getWd = () => process.cwd();
exports.absoluteFolder = (lPath) => path.resolve(lPath);
exports.merge = (lPath, name) => path.resolve(lPath, name);
exports.getEula = () => `#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).\neula=true`