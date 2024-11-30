 // services/authService.js
const User = require('../models/authchModel');

const updatePassword = async (username, currentPassword, newPassword) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the current password matches the stored password
  if (user.password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }

  // Update the user's password
  user.password = newPassword;
  await user.save();
  
  return { message: 'Password updated successfully' };
};

module.exports = {
  updatePassword,
};
