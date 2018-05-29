var path       = require('path');

var settings = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        protocol : "mysql:", // or "mysql"
        query    : { pool: true },
        host     : "127.0.0.1",
        database : "scalelabs",
        user     : "root",
        password : "password"
    }
};

module.exports = settings;