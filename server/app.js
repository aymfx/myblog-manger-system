var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入CORS跨域操作
var cors=require('CORS');
//引入mongoose模块
var mongoose=require('mongoose');

const mongiuri='mongodb://localhost:27017/vueblog';
mongoose.connect(mongiuri,{server:{sockedOptions:{keepAlive:1}}});
mongoose.connection.on('error',(err)=>{
  throw new Error('未连接到数据库',err);
})
console.log('连接成功');

var index = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');
var cate = require('./routes/cate');
var comment = require('./routes/comment');
var upload = require('./routes/upload');

var app = express();
app.use(cors());
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
app.use('/upload', upload);

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
