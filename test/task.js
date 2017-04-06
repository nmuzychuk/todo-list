var chai = require('chai');
var chaiHttp = require('chai-http');
var path = require('path');
var server = require(path.join(__dirname, '..', 'server'));

chai.should();

var Task = require(path.join('..', 'models', 'task'));

chai.use(chaiHttp);

describe('Tasks', function() {
    it('should list all tasks', function(done) {
        chai.request(server)
          .get('/api/tasks')
          .end(function(err, res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              done();
          });
    });

    it('should list a task', function(done) {
        var task = new Task({text: 'Task', isDone: false});

        task.save().then(function(data) {
            chai.request(server)
            .get('/api/tasks/' + data.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.equal(data.id);
                done();
            });
        });
    });

    it('should add a task', function(done) {
        chai.request(server)
          .post('/api/tasks')
          .send({text: 'Task', isDone: false})
          .end(function(err, res) {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a('object');
              done();
        });
    });

    it('should update a task', function(done) {
        var task = new Task({text: 'Task', isDone: false});

        task.save().then(function(data) {
            chai.request(server)
            .put('/api/tasks/' + data.id)
            .send({isDone: true})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.isDone.should.equal(true);
                done();
            });
        });
    });

    it('should delete a task', function(done) {
        var task = new Task({text: 'Task', isDone: false});

        task.save().then(function(data) {
            chai.request(server)
            .delete('/api/tasks/' + data.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
        });
    });
});
