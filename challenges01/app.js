var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200);
}).listen(8080);
