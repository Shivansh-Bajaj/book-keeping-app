let moment = require('moment');

module.exports = function (orm, db) {
    let author = db.define('author', {
            name : { type: 'text', required: true, unique: true },
            info : { type: 'text', required: false },
            created_at : { type: 'date', required: true, time: true }
        },
        {
            hooks: {
                beforeValidation: function () {
                    this.created_at = new Date();
                }
            },
            methods: {
                serialize: function () {
                    return {
                        name: this.name,
                        info: this.info,
                        created_at: moment(this.created_at).fromNow()
                    }
                }
            }
        });
};