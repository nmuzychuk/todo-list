var express = require('express');
var path = require('path');

var router = express.Router();

var Task = require(path.join(__dirname, '..', 'models', 'task'));

router.get('/', function(req, res, next){
    Task.find().exec(function(err, tasks){
        if (err) { res.send(err) }
        res.send(tasks);
    });
});

router.get('/:id', function(req, res, next){
    Task.find({_id: req.params.id}).exec(function(err, task){
        if (err) { res.send(err) }
        res.send(task);
    });
});

router.post('/', function(req, res, next){
    var task = new Task({
        text: req.body.text,
        isDone: false
    });

    task.save(function (err, task) {
        if (err) { res.send(err) }
        res.json(201, task);
    });
});

router.delete('/:id', function(req, res, next){
    Task.remove({_id: req.params.id}).exec(function(err, task){
        if (err) { res.send(err) }
        res.send(task);
    });
});

module.exports = router;
