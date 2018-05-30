const async = require('async');

module.exports = function (models) {
    return {
        set: function (data) {
            return new Promise((resolve, reject) => {
                models.author.create(data, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj)
                    }
                })
            })
        },
        get: function (query) {
            return new Promise((resolve, reject) => {
                models.author.find(query, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj)
                    }
                })
            })
        },
        getById: function (id) {
            return new Promise((resolve, reject) => {
                models.author.get(id, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj.serialize())
                    }
                })
            })
        },
        getOrCreateBulk: function (authors) {
            return new Promise((resolve, reject) => {
                let results = [];
                async.each(authors, function(author_name, callback) {
                    models.author.find({name: author_name}, (err, author_data) => {
                        if(err) {
                            callback(err);
                        } else {
                            if(author_data.length === 0) {
                                models.author.create({name: author_name}, (error, data) => {
                                    if(!error) {
                                        results.push(data);
                                        callback(null);
                                    } else {
                                        callback(err);
                                    }
                                    })
                            } else {
                                results.push(author_data[0]);
                                callback(null)
                            }
                        }
                    })
                }, function (err) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            })
        },
        put: function (id, data) {
            return new Promise((resolve, reject) => {
                models.author.find({id: id}, (err, obj) => {
                    if(err) {
                        reject(err);
                    } else {
                        obj.save(data, function (err, updatedObj) {
                            if(err || obj.length === 0) {
                                reject(err || "no such item found");
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
                models.author.find({id: id}, (err, obj) => {
                    if(err) {
                        reject(err);
                    } else {
                        obj.delete(function (err) {
                            if(err || obj.length === 0) {
                                reject(err || "no such item found");
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