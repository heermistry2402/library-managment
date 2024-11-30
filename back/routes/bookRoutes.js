const express = require('express');
const { addBook } = require('../controllers/bookController');
const multer = require('multer');
const Book = require('../models/bookModel'); // Import your Book model
const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where the files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Add Book route
router.post('/add-book', upload.single('coverImage'), addBook);

// Delete Book route
router.delete('/delete-book/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id); // Use findByIdAndDelete here
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

module.exports = router;
