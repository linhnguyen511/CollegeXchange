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


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all posts
	app.get('/api/posts', function(req, res) {
		// use mongoose to get all todos in the database
		Posts.find(function(err, post) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) res.json(err);
			res.json(post); // return all todos in JSON format
		});
	});

  // post to server
	app.post('/api/createpost', function(req, res) {
		  upload(req, res, function(err) {
				  if(err) {
				    console.log('Error Occured');
				    res.end('Upload fail');
						throw err;
						return;
				  }
          console.log(req.body);
          req.body.imagePath = req.file.filename;

					Posts.create(req.body, function(err,post){

									if (err) throw err;
									console.log('Post created');
									var id= post._id;
                  res.redirect('/');
					});
				  // res.end('Your File Uploaded');
				  console.log('Photo Uploaded');
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
