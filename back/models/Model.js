// models/userModel.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Check if the model exists before defining it again
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
