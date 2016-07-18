var express = require('express');
var app = express();
var router= express.Router();

app.use(express.static('./dist'));

app.get('/', function(req, res) {
    res.sendfile('./dist/index.html');
});

app.get('/about', function(req, res) {
    res.sendfile('./dist/views/about.html');
});

app.get('/portfolio', function(req, res) {
    res.sendfile('./dist/views/portfolio.html');
});

app.get('/blog', function(req, res) {
    res.sendfile('./dist/views/blog.html');
});

app.get('/contact', function(req, res) {
    res.sendfile('./dist/views/contact.html');
});

app.listen(8000);