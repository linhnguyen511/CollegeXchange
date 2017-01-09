var Posts = require('./models/postSchema');
var multer = require ('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log(file);
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

	app.post('/api/createpost', function(req, res) {
		  upload(req, res, function(err) {
				  if(err) {
				    console.log('Error Occured');
				    res.end('Upload fail');
						throw err;
						return;
				  }

					Posts.create(req.body, function(err,post){

									if (err) throw err;
									console.log('Post created');
									var id= post._id;

									res.writeHead(200,{'Content-Type':'text/plain'});
									res.end ('Added post with id' + id);

							//get and return all the posts after you create another
							Posts.find(function(err, post) {
									if (err) throw err;
									res.json(post);
							});
					});

				  // res.end('Your File Uploaded');
				  console.log('Photo Uploaded');
		  });



	});


	//
	// // delete a todo
	// app.delete('/api/todos/:todo_id', function(req, res) {
	// 	Todo.remove({
	// 		_id : req.params.todo_id
	// 	}, function(err, todo) {
	// 		if (err)
	// 			res.send(err);
	//
	// 		// get and return all the todos after you create another
	// 		Todo.find(function(err, todos) {
	// 			if (err)
	// 				res.send(err)
	// 			res.json(todos);
	// 		});
	// 	});
	// });

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendFile('../views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
