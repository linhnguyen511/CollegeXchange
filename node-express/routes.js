var Posts = require('./models/postSchema');
var multer = require ('multer');
var flash = require('connect-flash');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../public/uploads');
  },
  filename: function (req, file, callback) {
    // console.log(file);
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({storage: storage}).single('userPhoto');
// var Verify = require('./verify');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all posts
	app.get('/api/posts', function(req, res) {
		// use mongoose to get all todos in the database
		Posts.find(function(err, post) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) res.json(err);
			res.json(post); // return all posts in JSON format
		});
	});


 //get all category
  app.get('/api/items', function(req, res) {
    console.log(req.query);
    Posts.find(req.query, function(err, post) {
    // Posts.find({'category': req.query.category, 'subcategory':req.query.subcategory, 'condition':req.query.condition }, function(err, post) {
			// if there is an error retrieving, send the error
			if (err) res.json(err);
			res.json(post); // return all books in JSON format
		});
	});


  //get all dollarstore items
   app.get('/api/dollarstores', function(req, res) {
 		Posts.find({ 'price':{$lte: 5} },function(err, post) {
 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
 			if (err) res.json(err);
 			res.json(post); // return all books in JSON format
 		});
 	});

  //get individual product
   app.get('/api/singleitem', function(req, res) {
     console.log(req.query);
     Posts.find({ '_id': req.query.type },function(err, post) {
       // if there is an error retrieving, send the error. nothing after res.send(err) will execute
       if (err) res.json(err);
       res.json(post); // return all books in JSON format
     });
   });

  //return for search request
   app.get('/api/search', function(req, res) {
     console.log(req.query.type);
 		Posts.find({ 'title':{'$regex' : req.query.type , "$options": "i"}},function(err, post) {
 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
 			if (err) res.json(err);
 			res.json(post); // return all books in JSON format
 		});
 	});


  //return result for sidebar request
  //  app.get('/api/sidebar', function(req, res) {
  //    console.log(req.query.type);
 // 		Posts.find({ 'condition': {$in:req.query.type}}, function(err, post) {
 // 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
 // 			if (err) res.json(err);
 // 			res.json(post); // return all books in JSON format
 // 		});
 // 	});


  // post new item to server
	app.post('/api/createpost', function(req, res) {
      console.log(req.files);
		  upload(req, res, function(err) {
				  if(err) {
            // res.redirect('/#!/post')
				    res.json('Oh snap! Files were not uploaded successfully. Try submitting again.',401);
						throw err;
						return;
				  };

          if (req.file) {
            req.body.imagePath = req.file.filename;
          };

          Posts.create(req.body, function(err,post){
                  if (err) {
                      // req.flash('info', 'Hi there!');
                      // res.redirect('/#!/post');
                      res.json("Oh snap! Make sure to fill in all the required fields and try submitting again. Oh...and price should be a number", 401);
                  }
                  else {
                    var id= post._id;
                    res.json('Well done! Your post was submitted successfully');
                  };
          });
		  });
	});




	// delete a post
	// app.delete('/api/post/:post._id', function(req, res) {
	// 	Posts.remove({
	// 		_id : req.params.todo_id
	// 	}, function(err, post) {
	// 		if (err)
	// 			res.send(err);
  //
	// 		// get and return all the todos after you create another
	// 		Posts.find(function(err, post) {
	// 			if (err)
	// 				res.send(err)
	// 			res.json(post);
	// 		});
	// 	});
	// });

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
    res.render('index');
    // res.sendFile('../views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
