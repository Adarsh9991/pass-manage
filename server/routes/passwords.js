// routes/passwords.js
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { decrypt, encrypt } = require('../utils/encryption.js');

const router = express.Router();

// Create a new password entry
router.post('/passwords', auth, async (req, res) => {
  const { website, username, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const newEntry = { website, username, password: encrypt(password), favorite: false };
    user.passwords.push(newEntry);
    await user.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all password entries
router.get('/passwords', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const passwords = user.passwords.map(entry => ({
      ...entry.toObject(),
      password:decrypt(entry.password)
    }));
    res.json(passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a particular password entry by ID
router.get('/passwords/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const entry = user.passwords.id(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ ...entry.toObject(), password: decrypt(entry.password) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a password entry
router.put('/passwords/:id', auth, async (req, res) => {
  const { website, username, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const entry = user.passwords.id(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    entry.website = website || entry.website;
    entry.username = username || entry.username;
    entry.password = password ? encrypt(password) : entry.password;

    await user.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a password entry
router.delete('/passwords/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.passwords.id(req.params.id).deleteOne();
    await user.save();
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Mark an entry as favorite
router.patch('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const entry = user.passwords.id(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    entry.favorite = !entry.favorite;
    await user.save();
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Get all favorite entries
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const favoritePasswords = user.passwords
      .filter(p => p.favorite)
      .map(entry => ({
        ...entry.toObject(),
        password: decrypt(entry.password),
      }));
    res.json(favoritePasswords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;