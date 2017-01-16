var Posts = require('./models/postSchema');
var multer = require ('multer');

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
		Posts.find({ 'category': req.query.type },function(err, post) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) res.json(err);
			res.json(post); // return all books in JSON format
		});
	});

  //get all subcategory
  app.get('/api/subcategory', function(req, res) {
    console.log(req.query);
		Posts.find({ 'subcategory': req.query.type },function(err, post) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
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

  //return for search request
  //  app.get('/api/search', function(req, res) {
  //    console.log(req.body);
 // 		Posts.find({ 'price':{$lte: 5} },function(err, post) {
 // 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
 // 			if (err) res.json(err);
 // 			res.json(post); // return all books in JSON format
 // 		});
 // 	});


  // post new item to server
	app.post('/api/createpost', function(req, res) {
		  upload(req, res, function(err) {
				  if(err) {
				    res.end('Upload fail');
						throw err;
						return;
				  }
          req.body.imagePath = req.file.filename;

					Posts.create(req.body, function(err,post){

									if (err) throw err;
									var id= post._id;
                  res.redirect('/');
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
		res.sendFile('../views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
