var path = require('path');
var http = require('http');
var express = require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser = require ('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var cons = require('consolidate');

var config = require('./config');


var hostname='172.31.5.17';
// var hostname='localhost';
var port = 3000;

//use express framwork
var app=express();

//log data
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash({ unsafe: true }));
app.use(session({ cookie: { maxAge: 60000 },
                  secret: 'iHateThisShit',
                  resave: false,
                  saveUninitialized: false}));
// app.use(methodOverride());


// passport config
var User = require('./models/userSchema');
// passport.use(User.createStrategy());
app.use(passport.initialize());
// app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname + '/../views'));
app.set('view engine', 'html');

//include static files to Express (all files to clients)
app.use(express.static(__dirname + '/../views'));
app.use(express.static(__dirname + '/../public'));

//routes
require('./userRoutes.js')(app);
require('./routes.js')(app);



//connect to Mongodb
mongoose.Promise = global.Promise;
var url='mongodb://localhost:27017/collegeXchange';
mongoose.connect(url);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("Connected to Server");
});


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
