var url = require('url');
var request = require('request');
var express = require('express');

options = {
  // add URL options here
    "protocol" : "http:",
    "host" : "search.twitter.com",
    "pathname" : "/search.json",
    "query" : {'q' : 'codeschool'}
};

var searchURL = url.format(options);

var app = express();

app.get('/', function(req, res) {
    request(searchURL).pipe(res);
});

app.listen(8080);
