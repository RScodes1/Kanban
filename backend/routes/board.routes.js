const express = require('express');

const Brouter = express.Router()
const {Board} = require('../models/board.models');
const {Subtask} = require('../models/subtask.model');
const {Task} = require('../models/task.model');

const {authMiddleware} = require('../middleware/auth.middleware');

Brouter.get('/boards', authMiddleware, async (req, res) => {
    try {
      const boards = await Board.find({ user: req.userId }).populate('tasks');
      res.status(200).json(boards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  Brouter.post('/boards', authMiddleware, async (req, res) => {
    try {
      const { name } = req.body;
      const board = new Board({ name, user: req.userId });
      await board.save();
      res.status(201).json(board);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Task routes
  Brouter.post('/tasks', authMiddleware, async (req, res) => {
    try {
      const { title, description, status, subtasks } = req.body;
      const task = new Task({ title, description, status, subtasks });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  Brouter.put('/tasks/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Task.findByIdAndUpdate(id, { status });
      res.status(200).json({ message: 'Task status updated successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Subtask routes
  Brouter.post('/subtasks', authMiddleware, async (req, res) => {
    try {
      const { title, isCompleted } = req.body;
      const subtask = new Subtask({ title, isCompleted });
      await subtask.save();
      res.status(201).json(subtask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  Brouter.put('/subtasks/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { isCompleted } = req.body;
      await Subtask.findByIdAndUpdate(id, { isCompleted });
      res.status(200).json({ message: 'Subtask status updated successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = {
    Brouter
}