// routes/bookRoutes.js
const express = require('express');
const { getTotalBooks } = require('../controllers/dashbordController');
const router = express.Router();

router.get('/total-books', getTotalBooks);

module.exports = router;
