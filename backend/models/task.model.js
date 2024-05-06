const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type : String},
    description: {type : String},
    status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }]
  });
  const Task = mongoose.model('Task', taskSchema);

  module.exports = {
    Task
  }