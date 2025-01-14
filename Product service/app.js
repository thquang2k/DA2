var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const init = require('./init')
init.init()

//route setup
app.use('/', indexRouter);
var productRouter = require('./routes/products');
app.use('/products', productRouter);

module.exports = app;
