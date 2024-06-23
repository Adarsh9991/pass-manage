// models/User.js
const mongoose = require('mongoose');
const { encrypt } = require('../utils/encryption.js');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwords: [
    {
      website: String,
      username: String,
      password: String,  // This will be encrypted
      favorite: Boolean,
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified('passwords')) {
    // Only encrypt new passwords that are being added
    const newPasswords = this.passwords.filter(entry => !entry._id); // Assuming _id is present for existing passwords
    const encryptedPasswords = await Promise.all(newPasswords.map(async entry => ({
      ...entry,
      password: await encrypt(entry.password),
    })));
    this.passwords = [...this.passwords.filter(entry => entry._id), ...encryptedPasswords];
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);