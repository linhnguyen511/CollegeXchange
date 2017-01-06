var express = require('express');
var bodyParser = require ('body-parser');
var mongoose=require('mongoose'),
    assert=require('assert');

//include Schema
var Posts = require('./postSchema');

//create router Object
var postRouter = express.Router();

//parse data received from client
postRouter.use(bodyParser.urlencoded({extended:true}));
postRouter.use(bodyParser.json());

postRouter.route('/')
  // .get(function(req,res,next){
  //     Posts.find({}, function(err,post){
  //           if (err) throw err;
  //           res.json(post);
  //     });
  // })
  .post(function(req,res,next){
      Posts.create(req.body, function(err,post){
            if (err) throw err;
            console.log('Post created');
            var id= post._id;

            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end ('Added post with id' + id);
            console.log(post);
        });
  })
  .delete(function(req,res,next){
      Posts.remove({},function(err,resp){
          if (err) throw err;
          res.json(resp);
      });
  })

postRouter.route('/:postId')
  // .get(function(req,res,next){
  //     Posts.findById(req.params.postId, function(err,post){
  //         if (err) throw err;
  //         res.jason(post);
  //     });
  // })
  .put(function(req,res,next){
      Posts.findByIdAndUpdate(req.params.postId,{
          $set: req.body
      },{
          new:true
      }, function(err,post){
          if (err) throw err;
          res.json(post);
      });
  })
  .delete(function(req,res,next){
      Posts.findByIdAndRemove(req.params.postId, function(err,resp){
          if (err) throw err;
          res.json(resp);
      });
  })

// postRouter.post('/',function(req,res,next){
//           res.end('Will add product:' + req.body.title + 'with details:' + req.body.description);
//     console.log('Test --->' + req.body.title);
//   });

module.exports = postRouter;
