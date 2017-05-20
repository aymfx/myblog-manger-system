var express = require('express');
//引入cors跨域

var cors = require('CORS');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');
var cate = require('./routes/cate');
var comment = require('./routes/comment');
var mongoose = require('mongoose'); // 引入mongoose模块

//链接
const mongiuri = 'mongodb://localhost:27017/blog';
mongoose.connect(mongiuri, { server: { sockedOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    throw new Error("链接失败");
})

console.log('connect success');

var app = express();
app.use(cors()); // 使用cors跨域操作

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/blog', blog);
app.use('/cate', cate);
app.use('/comment', comment);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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