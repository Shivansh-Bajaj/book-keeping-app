let moment = require('moment');

module.exports = function (orm, db) {
    let book = db.define('book', {
        title : { type: 'text', required: true, unique: true },
        isbn : { type: 'text', required: true },
        image_url: { type: 'text', required: false },
        book_edition : { type: 'text', required: false },
        price : { type: 'number', required: true },
        published_at: { type: 'date', required: true, time: false },
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
                        title : this.title,
                        isbn : this.isbn,
                        image_url: this.image_url,
                        book_edition : this.book_edition,
                        price : this.price,
                        published_at: this.published_at,
                        created_at: moment(this.created_at).fromNow()
                    }
                }
            }
        });

    book.hasOne('publisher', db.models.publisher, { required: true, autoFetch: true });
    book.hasMany('authors', db.models.author);

};