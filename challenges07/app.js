var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);

var redis = require('redis');
var redisClient = redis.createClient();

io.sockets.on('connection', function(client) {
   redisClient.lrange("questions", 0, -1, function(err, questions) {
         questions.forEach(function(question){
    			client.emit('question', question);
 			 });
    });
  client.on('answer', function(question, answer) {
    client.broadcast.emit('answer', question, answer);
  });

  client.on('question', function(question) {
    if(!client.question_asked) {
      client.question_asked = true;
      client.broadcast.emit('question', question);
      // add the question to the list here
      redisClient.lpush("questions", question, function() {
           redisClient.ltrim("questions", 0, 19);
      });

    }
  });
});


