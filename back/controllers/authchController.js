// controllers/authController.js
const authService = require('../services/authchService');

const updatePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const response = await authService.updatePassword(username, currentPassword, newPassword);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updatePassword,
};
