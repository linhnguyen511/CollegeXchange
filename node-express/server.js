var express = require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');

var postRouter=require('./models/postRouter');

var hostname='localhost';
var port = 4000;

//use express framwork
var app=express();

//include files to Express (all files to clients)
app.use(express.static(__dirname + '/../views'));
app.use(express.static(__dirname + '/..'));

//connect to Mongodb
var url='mongodb://localhost:27017/collegeXchange';
mongoose.connect(url);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("Connected to Server");
});

//log data
app.use(morgan('dev'));

//include Router to access data
app.use('/',postRouter);

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

//listen to clients
app.listen(port,hostname,function(){
    console.log('Server running');
});
