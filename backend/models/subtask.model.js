const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title: {type : String},
    isCompleted: {type : Boolean}
  });
  const Subtask = mongoose.model('Subtask', subtaskSchema);

  module.exports = {
    Subtask
  }