var express = require('express');
var path = require('path');

var router = express.Router();

var Task = require(path.join(__dirname, '..', 'models', 'task'));

router.get('/', function(req, res){
    Task.find().exec(function(err, tasks){
        if (err) { res.send(err) }
        res.send(tasks);
    });
});

router.get('/:id', function(req, res){
    Task.findOne({_id: req.params.id}).exec(function(err, task){
        if (err) { res.send(err) }
        res.send(task);
    });
});

router.post('/', function(req, res){
    var task = new Task({
        text: req.body.text,
    });

    task.save(function (err, task) {
        if (err) { res.send(err) }
        res.status(201).json(task);
    });
});

router.put('/:id', function(req, res){
    Task.findByIdAndUpdate(
        req.params.id, {text: req.body.text}, {new: true}, function(err, task){
        if (err) { res.send(err) }
        res.send(task);
    });
});

router.delete('/:id', function(req, res){
    Task.remove({_id: req.params.id}).exec(function(err, task){
        if (err) { res.send(err) }
        res.send(task);
    });
});

module.exports = router;
