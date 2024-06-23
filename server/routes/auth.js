const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
      const user = await User.findOne({ username });
      if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' ,token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;