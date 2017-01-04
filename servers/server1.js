var http=require ('http');
var fs=require ('fs');
var qs = require('querystring');
var path=require ('path');

var hostname='localhost';
var port=3000;

var server=http.createServer(function(req,res){

    if (req.method == 'GET'){
        var fileUrl;

        //Set default request if no specific path identified
        if (req.url =="/")
          fileUrl ='/index.html';
        else fileUrl=req.url;

        //set location to find files required from request
        var filePath;

        if (path.extname(fileUrl)=='.html'){
          // console.log("file: " + fileUrl);
            filePath=path.resolve('../views' + fileUrl);
            res.writeHead(200,{'Content-Type':'text/html'});
        } else {
            filePath=path.resolve('..' + fileUrl);
            res.writeHead(200);
        }

        //Check if files exist or not
        fs.exists(filePath, function(exists){
            //If file not exists
            if (!exists){
                res.writeHead(404, {'Content-Type':'text/html'});
                res.end('<h1> Error 404: Content not found');
                return;
            };

        //Send response to client

        fs.createReadStream(filePath).pipe(res);
      });
    }


    else if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post);
            res.writeHead(200);
            res.end('<h1> Message posted successfully');
        });
    }


    else {
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end('<h1> Error 404: Content not found');
    }

});

//Server listen to request from clients
server.listen(port,hostname,function(){
});
