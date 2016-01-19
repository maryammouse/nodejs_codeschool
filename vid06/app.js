var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('messages', function(data) {
        var nickname = client.nickname;
        client.broadcast.emit("message", nickname + ": " + message);

        client.emit("messages", nickname  + ": " + message);
    });

    client.on('join', function(name) {
        client.nickname = name;
    })

    client.emit('messages', {hello: 'world'});
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
