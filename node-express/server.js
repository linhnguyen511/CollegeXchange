var express = require('express');
var morgan=require('morgan');
var bodyParser = require ('body-parser');

var hostname='localhost';
var port = 2000;

var app=express();

app.use(morgan('dev'));

//create Router for Express (node JS)
var expRouter=express.Router();
expRouter.use(bodyParser.urlencoded());
expRouter.use(bodyParser.json());
expRouter.route('/')
    .post(function(req,res,next){
          req.on("data",function(chunk){

              console.log(chunk.toString());
          });
          res.end('Will add product:' + req.body.title + 'with details:' + req.body.description);
    console.log('Test --->' + req.body.title);
  });

app.use('/',expRouter);



//include files to Express (all files to clients)
app.use(express.static(__dirname + '/../views'));
app.use(express.static(__dirname + '/..'));

//listen to clients
app.listen(port,hostname,function(){
    console.log('Server running');
});
