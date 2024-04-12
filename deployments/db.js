const fs = require("fs");

class Database {

    _path(network) {
        return `./db/${network}.json`;
    }

    read(network, path) {
        const filePath = this._path(network)
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath))[path];
        }
        return null;
    }

    write(network, path, address) {
        let file = {};
        const filePath = this._path(network);
        if (fs.existsSync(filePath)) {
            file = JSON.parse(fs.readFileSync(filePath));
        }
        file[path] = address;
        fs.writeFileSync(filePath, JSON.stringify(file));
    }
}

module.exports = Database;
