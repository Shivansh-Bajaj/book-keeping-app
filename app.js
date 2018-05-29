var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var mysql = require("mysql");
var models   = require('./models/');
const busboyBodyParser  = require('busboy-body-parser');

var indexRouter = require('./routes/index');
// var db  = require('./db');
var app = express();

//Database connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(function(req, res, next){
//     res.locals.connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : ' ',
//         database : 'test'
//     });
//     res.locals.connect();
//     next();
// });

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(busboyBodyParser({ multi: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('/', function(request, response) {
response.sendFile(path.resolve(__dirname, './client/build/', 'index.html'));
});
app.use(function (req, res, next) {
    models(function (err, db) {
        if (err) return next(err);

        req.models = db.models;
        req.db     = db;

        return next();
    });
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
