var models = require('./models/');

models(function (err, db) {
    if (err) throw err;
    db.sync(function (err) {
        if (err) throw err;
        else console.log("successfully synced");
        db.close()
    });
});