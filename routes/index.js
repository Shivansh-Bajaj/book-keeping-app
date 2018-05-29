let async = require('async');
let express = require('express');
let author = require('../services/author');
let publisher = require('../services/publisher');
let book = require('../services/book');
const csv=require('csvtojson');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.db);
    res.render('index', { title: 'Express' });
});

router.get('/author/nameall', function (req, res) {
    author(req.models).get({}).then(async function (result) {
        let data = result.map((element) => {
            return {text: element.name, id: element.name, name: element.name}
        });
        await res.status(200).json({
            "status": "success",
            "data": data
        })
        })
        .catch((err) => {
            res.status(500).json({
                "status": "fail",
                "error": err
            })
        })
});

router.get('/author', function (req, res) {
    if(!req.query.hasOwnProperty('q') || req.query.q === "") {
        author(req.models).get(req.query).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        })
    } else {
        req.db.driver.execQuery('ALTER TABLE author ADD FULLTEXT (name, info);', function (err, data) {
            if (!err) {
                let query = "SELECT * FROM author WHERE MATCH (name,info) AGAINST ('\\"+req.query.q+"*' IN Boolean MODE);";
                req.db.driver.execQuery(query, function (error, data) {
                    console.log(error, data);
                    res.status(200).json({
                        "status": "success",
                        "error": data
                    })
                })
            } else {
                console.log(err);
                res.status(500).json({
                    "status": "fail",
                    "error": err
                })
            }
        })
    }
});

router.post('/author', function (req, res) {
    if(req.body.hasOwnProperty('name')) {
        author(req.models).set(req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        }).catch(err => {
            res.status(500).json({
                "status": "fail",
                "msg": err
            })
        })
    } else {
        res.status(500).json({
            "status": "fail"
        })
    }
});

router.put('/author', function (req, res) {
    if(req.body.hasOwnProperty('id')) {
        author(req.models).put(req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

router.delete('/author', function (req, res) {
    if(req.body.hasOwnProperty('name')) {
        author(req.models).delete(req.body).then( () => {
            res.status(200).json({
                "status": "success"
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

// publishers

router.get('/publisher/nameall', function (req, res) {
    publisher(req.models).get({}).then(async function (result) {
        let data = result.map((element) => {
            return {text: element.title, id: element.id, title: element.title}
        });
        await res.status(200).json({
            "status": "success",
            "data": data
        })
    })
        .catch((err) => {
            res.status(500).json({
                "status": "fail",
                "error": err
            })
        })
});

router.get('/publisher', function (req, res) {
    publisher(req.models).get(req.query).then(result => {
        res.status(200).json({
            "status": "success",
            "data": result
        })
    })
});

router.post('/publisher', function (req, res) {
    if(req.body.hasOwnProperty('title')) {
        publisher(req.models).set(req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        }).catch(err => {
            res.status(500).json({
                "status": "fail",
                "msg": err
            })
        })
    } else {
        res.status(500).json({
            "status": "fail"
        })
    }
});

router.put('/publisher', function (req, res) {
    if(req.body.hasOwnProperty('id')) {
        publisher(req.models).put(req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

router.delete('/publisher', function (req, res) {
    if(req.body.hasOwnProperty('id')) {
        publisher(req.models).delete(req.body).then( () => {
            res.status(200).json({
                "status": "success"
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

// books


router.get('/book', function (req, res) {
    if(!req.query.hasOwnProperty('q')) {
        book(req.models).get(req.query).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        })
    } else {
        req.db.driver.execQuery('ALTER TABLE book ADD FULLTEXT (name, info);', function (err, data) {
            if (!err) {
                let query = "SELECT * FROM book WHERE MATCH (name,info) AGAINST ('\\"+req.query.q+"*' IN Boolean MODE);";
                req.db.driver.execQuery(query, function (error, data) {
                    console.log(error, data);
                    res.status(200).json({
                        "status": "success",
                        "error": data
                    })
                })
            } else {
                console.log(err);
                res.status(500).json({
                    "status": "fail",
                    "error": err
                })
            }
        })
    }
});

router.post('/book', function (req, res) {
    if(req.body.hasOwnProperty('title') && req.body.hasOwnProperty('price') &&
        req.body.hasOwnProperty('isbn') && req.body.hasOwnProperty('published_at')) {
        if(req.body.hasOwnProperty('author')) {
            req.body.author = req.body.author.split(',');
        }
        book(req.models).set(req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        }).catch(err => {
            res.status(500).json({
                "status": "fail",
                "msg": err
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "published_at, title, isbn, price are required fields"
        })
    }
});

router.put('/book', function (req, res) {
    if(req.body.hasOwnProperty('id')) {
        book(req.models).put(req.body.id, req.body).then(result => {
            res.status(200).json({
                "status": "success",
                "data": result
            })
        }).catch((err) => {
            res.status(500).json({
                "status": "fail",
                "msg": err
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

router.delete('/book', function (req, res) {
    if(req.body.hasOwnProperty('id')) {
        book(req.models).delete(req.body.id).then( () => {
            res.status(200).json({
                "status": "success"
            })
        })
    } else {
        res.status(500).json({
            "status": "fail",
            "msg": "id is neccessary"
        })
    }
});

router.post('/csvupload', function (req, res) {
    let error = {};
    csv({
        flatKeys:true
    })
        .fromString(req.files.file[0].data.toString())
        .subscribe((json, index)=>{
            return new Promise((resolve,reject)=>{
                if(json.hasOwnProperty('title') && json.hasOwnProperty('price') &&
                    json.hasOwnProperty('isbn') && json.hasOwnProperty('published_at') &&
                    json.hasOwnProperty('publisher')) {
                    if(json.hasOwnProperty('author')) {
                        json.author = json.author.split(',');
                    }
                    book(req.models).set(json).then(result => {
                        resolve();
                    }).catch(err => {
                        error[index] = err;
                        resolve();
                    });
                } else {
                    error[index] = "required field not found";
                    resolve();
                }
            })
        }, (err) => {
            console.log("error", err);
        }, (err) => {
            if(Object.keys(err).length !== 0) {
                res.status(200).send({
                    "status": "partial",
                    "error": error
                })
            } else {
                res.status(200).send({
                    "status": "complete"
                })
            }
        })

});

module.exports = router;
