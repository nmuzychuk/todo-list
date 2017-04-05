var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var index = require(path.join(__dirname, 'routes', 'index'));
var tasks = require(path.join(__dirname, 'routes', 'tasks'));

var app = express();
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todolist');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/tasks', tasks);

app.listen(port);

module.exports = app;
