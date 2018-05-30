var orm      = require('orm');
var settings = require('../config/index');

var connection = null;

function setup(db, cb) {
    require('./author')(orm, db);
    require('./publisher')(orm, db);
    require('./book')(orm, db);

    return cb(null, db);
}

module.exports = function (cb) {
    if (connection) return cb(null, connection);
    console.log(settings);

    orm.connect(settings.database, function (err, db) {
        if (err) return cb(err);
        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};
