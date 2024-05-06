const express = require('express');

const router = express.Router()
const {UserModel } = require('../models/users.model');

router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new UserModel({ username, email, password });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'secret');
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  });

  module.exports = {
    router
  }