var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    text: String,
    isDone: Boolean
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
