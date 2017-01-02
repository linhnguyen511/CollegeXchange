var http=require ('http');
var fs=require ('fs');
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
          console.log("file: " + fileUrl);
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


    } else {
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end('<h1> Error 404: Content not found');
    }

});

//Server listen to request from clients
server.listen(port,hostname,function(){
});
