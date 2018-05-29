
module.exports = function (models) {
    return {
        set: function (data) {
            return new Promise((resolve, reject) => {
                models.publisher.create(data, (err, obj) => {
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
                models.publisher.find(query, (err, obj) => {
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
                models.publisher.get(id, (err, obj) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(obj.serialize())
                    }
                })
            })
        },
        getOrCreate: function (title) {
            return new Promise((resolve, reject) => {
                models.publisher.find({title: title}, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        if(result.length === 0) {
                            models.publisher.create({title: title}, (err, data) => {
                                if(err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            })
                        } else {
                            resolve(result[0]);
                        }
                    }
                })
            })
        },
        put: function (id, data) {
            return new Promise((resolve, reject) => {
                models.publisher.find({id: id}, (err, obj) => {
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
                models.publisher.find({id: id}, (err, obj) => {
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