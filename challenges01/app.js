var http = require('http');
var fs = require('fs');

http.createServer(function(request, response){
    response.writeHead(200);
    response.end("Hello, this is dog.");
}).listen(8080);
