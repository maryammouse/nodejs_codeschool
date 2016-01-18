var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    request.pipe(response);
}).listen(8080)


/*
    request.on('readable', function() {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            response.write(chunk);
        }
    });
    request.on('end', function() {
        response.end();
    });
*/
