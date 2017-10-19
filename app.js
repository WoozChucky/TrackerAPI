var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

//Frontend
var index = require('./routes/index');
var users = require('./routes/users');
//Backend
var userApiController = require('./routes/api/users');

var app = express();

var port = process.env.PORT || 8080;

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public',
    debug: true,       
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api/user', userApiController);

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
  if(err.status == 404) {
    res.render('error', {message: 'The resource you are looking for does not exist!'});
  } else {
    res.render('error');
  }
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;
