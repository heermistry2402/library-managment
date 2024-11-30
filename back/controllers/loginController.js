// controllers/authController.js
const authService = require('../services/loginService');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.loginUser(username, password);
    
    // Return a dummy token for now (in production use JWT or similar)
    res.json({ token: 'dummy-token', message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
};
