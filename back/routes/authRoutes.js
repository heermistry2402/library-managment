const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering a new admin
router.post('/admin/register', authController.register);

module.exports = router;
