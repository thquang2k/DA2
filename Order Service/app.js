var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var vnpRouter = require('./routes/vnp');
app.use('/vnp', vnpRouter);
var orderRoute = require('./routes/orders');
app.use('/orders', orderRoute);
var couponRoute = require('./routes/coupons');
app.use('/coupons', couponRoute);

module.exports = app;
