
module.exports = function (orm, db) {
    let publisher = db.define('publisher', {
            title : { type: 'text', required: true, unique: true },
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
                        title: this.title,
                        info: this.info,
                        created_at: moment(this.created_at).fromNow()
                    }
                }
            }
        });
};