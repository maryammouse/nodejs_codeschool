var express =  require('express');
var request = require('request');
var url = require('url');

var app = express();

app.get('/tweets/:username', function(req, response) {
    var username = req.params.username;

    options = {
        protocol: "http:",
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_timeline.json',
        query: { screen_name: username, count: 10}
    }

    var twitterUrl = url.format(options);

    request(url, function(err, res, body) {
        var tweets = JSON.parse(body);
        response.locals = {tweets: tweets, name: username};
        response.render('tweets.ejs');

    });
});

app.listen(8080);
