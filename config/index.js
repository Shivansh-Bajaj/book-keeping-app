var path       = require('path');

var settings = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        "production": {
            protocol : "mysql:", // or "mysql"
            query    : { pool: true },
            host     : "sql12.freesqldatabase.com",
            database : "sql12240354",
            user     : "sql12240354",
            password : "n6i46Sxlj6"
        },
        "development": {
            protocol : "mysql:", // or "mysql"
            query    : { pool: true },
            host     :  "127.0.0.1",
            database : "scalelabs",
            user     :  "root",
            password :  "password"
        }
    }
};

module.exports = settings;