var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();

client.set("message1", "hello, yes this is dog");
client.set("message2", "hello, no this is spider");

client.get("message1", function(err, reply) {
    console.log(reply);
});

var storeMessage = function(name, data) {
    var message = JSON.stringify({name: name, data: data});

    redisClient.lpush("messages", message, function(err, response) {
        redisClient.ltrim("messages", 0, 9);
    })
}

io.sockets.on('connection', function(client) {
    client.on('messages', function(message) {
        client.get("nickname", function(error, name) {
            client.broadcast.emit("message", nickname + ": " + message);
            client.emit("messages", name  + ": " + message);
            storeMessage(name, message);
        });
    });

    client.on('join', function(name) {
        client.broadcast.emit("add chatter", name);

        redisClient.smembers('names', function(err, names) {
            names.forEach(function(name){
                client.emit('add chatter', name)
            });
        });

        redisClient.sadd("chatters", name);
        redisClient.lrange("messages", 0, -1, function(err, response) {
             messages = messages.reverse();

            messages.forEach(function(message) {
                message = JSON.parse(message);
            client.emit("messages", message.name + ": " + message.data);
        });
        client.set('nickname', name);
        client.broadcast.emit("chat", name + " joined the chat");
    });

    client.on('disconnect', function(name) {
        client.get('nickname', function(err, name){
            client.broadcast.emit("remove chatter", name);

            redisClient.strem("chatters", name);
        });
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
