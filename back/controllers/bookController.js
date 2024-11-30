const bookService = require('../services/bookService');

const addBook = async (req, res) => {
  try {
    const { title, author, publisherDate, price, pages, publisher, isbn } = req.body;
    const coverImage = req.file ? req.file.path : null; // Get uploaded image path

    const bookData = {
      title,
      author,
      publisherDate,
      price,
      pages,
      publisher,
      coverImage,
      isbn,
    };

    const newBook = await bookService.addBook(bookData);
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add the book', error: error.message });
  }
};
exports.createBook = (req, res) => {
  // Your logic for creating a book
  res.send('Book created!'); // Placeholder response
};
module.exports = {
  addBook,
};
