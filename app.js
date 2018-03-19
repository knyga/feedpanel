var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('hello world')
});

app.get('/admin', function (req, res) {
  res.send('hello world')
});