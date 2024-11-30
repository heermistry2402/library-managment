// routes/authRoutes.js
const express = require('express');
const { updatePassword } = require('../controllers/authchController');
const router = express.Router();

router.post('/update-password', updatePassword);

module.exports = router;
