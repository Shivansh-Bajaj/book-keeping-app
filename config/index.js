var path       = require('path');

// var settings = {
//     path       : path.normalize(path.join(__dirname, '..')),
//     port       : process.env.NODE_PORT || 3000,
//     database   : {
//         protocol : "mysql:", // or "mysql"
//         query    : { pool: true },
//         host     : "sql12.freesqldatabase.com" || "127.0.0.1",
//         database : "sql12240354" ||"scalelabs",
//         user     : "sql12240354" || "root",
//         password : "n6i46Sxlj6" || "password"
//     }
// };

var settings = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        protocol : "mysql:", // or "mysql"
        query    : { pool: true },
        host     :  "127.0.0.1",
        database : "scalelabs",
        user     :  "root",
        password :  "password"
    }
};
module.exports = settings;