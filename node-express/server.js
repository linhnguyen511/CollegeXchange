var express = require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser = require ('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('./config');


// var postRouter=require('./models/postRouter');

var hostname='localhost';
var port = 3000;

//use express framwork
var app=express();

//log data
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// passport config
var User = require('./models/userSchema');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//include static files to Express (all files to clients)
app.use(express.static(__dirname + '/../views'));
app.use(express.static(__dirname + '/../public'));

//routes
require('./routes.js')(app);
require('./userRoutes.js')(app);


//connect to Mongodb
mongoose.Promise = global.Promise;
var url='mongodb://localhost:27017/collegeXchange';
mongoose.connect(url);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("Connected to Server");
});



//include Router to access data
// app.use('*',postRouter);


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
  res.json('error');
});

//listen to clients
app.listen(port,hostname,function(){
    console.log('Server running');
});
