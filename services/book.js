

const async = require('async');
let author = require('./author');
let publisher = require('./publisher');


module.exports = function (models) {
    return {
        set: function (data) {
            return new Promise((resolve, reject) => {
                async.auto({
                    createAuthors: function (cb) {
                        if(data.hasOwnProperty('authors')) {
                            author(models).getOrCreateBulk(data['authors'])
                                .then(result => {
                                    cb(null,result);
                                })
                                .catch(err => {
                                    cb(err)
                                })
                        } else {
                            cb(null)
                        }
                    },
                    createPublisher: function (cb) {
                        publisher(models).getOrCreate(data['publisher'])
                            .then(result => {
                                cb(null,result);
                            })
                            .catch(err => {
                                cb(err)
                            })
                    },
                    createBook: ['createPublisher', function (results, cb) {
                        let obj = {
                            title : data['title'],
                            isbn : data['isbn'],
                            image_url: data['image_url'],
                            book_edition : data['book_edition'],
                            price : data['price'],
                            published_at: new Date(data['published_at']),
                            publisher_id: results.createPublisher.id
                        };
                        models.book.create(obj, (err, result) => {
                            if(err) {
                                cb(err);
                            } else {
                                cb(null, result);
                            }
                        })
                    }],
                    join: ['createAuthors', 'createBook', function (results, cb) {
                        if(results.hasOwnProperty('createAuthors')) {
                            try {
                                results.createBook.addAuthors(results.createAuthors);
                                cb(null, results.createBook);
                            } catch (e) {
                                cb(e)
                            }
                        } else {
                            cb("book should have atleast one author");
                        }
                    }]
                }, function (err, result) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            })
        },
            setBulk: function (data) {
                return new Promise((resolve, reject) => {
                    async.auto({
                        createAuthors: function (cb) {
                            if(data.hasOwnProperty('author')) {
                                author(models).getOrCreateBulk(data['author'])
                                    .then(result => {
                                        cb(null,result);
                                    })
                                    .catch(err => {
                                        cb(err)
                                    })
                            } else {
                                cb(null)
                            }
                        },
                        createPublisher: function (cb) {
                            if(data.hasOwnProperty('publishers')) {
                                publisher(models).getOrCreate(data['publisher'])
                                    .then(result => {
                                        cb(null,result);
                                    })
                                    .catch(err => {
                                        cb(err)
                                    })
                            } else {
                                cb(null)
                            }
                        },
                        createBook: function (cb) {
                            let obj = {
                                title : data['title'],
                                isbn : data['isbn'],
                                image_url: data['image_url'],
                                book_edition : data['book_edition'],
                                price : data['price'],
                                published_at: new Date(data['published_at']),
                                created_at: data['created_at']
                            };
                            models.book.create(obj, (err, result) => {
                                if(err) {
                                    cb(err);
                                } else {
                                    cb(null, result);
                                }
                            })
                        },
                        join: ['createAuthors','createPublisher', 'createBook', async function (results, cb) {
                            if(results.hasOwnProperty('createAuthors')) {
                                try {
                                    results.createBook.addAuthors(results.createAuthors)
                                } catch (e) {
                                    cb(e)
                                }
                            }
                            if(results.hasOwnProperty('createPublisher')) {
                                try {
                                    results.createBook.addPublisher(results.createPublisher)
                                } catch (e) {
                                    cb(e)
                                }
                            }
                            await cb(null, results.createBook);
                        }]
                    }, function (err, result) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                })
            },

            getByName: function (name) {
            return new Promise((resolve, reject) => {
                models.book.find({name: name}, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj.serialize())
                    }
                })
            })
        },
        get: function (query) {
            return new Promise((resolve, reject) => {
                models.book.find(query, (err, obj) => {
                    async.each(obj, function (element, cb) {
                        element.getAuthors((err, result) => {
                            if(!err) {
                                element.authors = result;
                                cb();
                            } else {
                                cb(err);
                            }

                        })

                    }, function (err) {
                        if(err) {
                            reject(err)
                        } else {
                            resolve(obj);
                        }
                    });

                })
            })
        },
        getById: function (id) {
            return new Promise((resolve, reject) => {
                models.book.get(id, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj.serialize())
                    }
                })
            })
        },
        put: function (id, data) {
            return new Promise((resolve, reject) => {
                if(data.hasOwnProperty('published_at')) {
                    data['published_at'] = new Date(data['published_at'])
                }
                models.book.find({id: id}, (err, obj) => {
                    if(err || obj.length === 0) {
                        reject(err || "no such item found");
                    } else {

                        obj[0].save(data, function (err, updatedObj) {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(updatedObj.serialize());
                            }
                        });
                    }
                })
            })
        },
        delete: function (id) {
            return new Promise((resolve, reject) => {
                models.book.get(id, (err, obj) => {
                    if(err || !obj) {
                        reject(err || "no such item found");
                    } else {
                        obj.remove(function (err) {
                            if(err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    }
                })
            })
        }
    }
};