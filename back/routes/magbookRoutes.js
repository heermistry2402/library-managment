const express = require('express');
const router = express.Router();
const bookController = require('../controllers/magbookController');
const multer = require('multer');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get('/get-books', bookController.getBooks);
router.post('/add-book', upload.single('coverImage'), bookController.addBook);
router.put('/update-book/:id', upload.single('coverImage'), bookController.updateBook);
router.delete('/delete-book/:id', bookController.deleteBook);

module.exports = router;
