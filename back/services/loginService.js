// services/authService.js
const User = require('../models/Model');

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the input password with the stored password (No hashing in this case)
  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return user;
};

module.exports = {
  loginUser,
};
