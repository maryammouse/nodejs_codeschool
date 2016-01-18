var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Dog is running.");
    var date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    console.log("Process started");
    console.log(time);
    setTimeout(function(){
        response.write("Dog is done.");
        console.log('Process ended');
        var date = new Date();
        var n = date.toDateString();
        var time = date.toLocaleTimeString();
        console.log(time);
        response.end();
    }, 5000);
}).listen(8080);
