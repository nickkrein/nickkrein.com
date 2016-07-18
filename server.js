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


app.listen(8000);