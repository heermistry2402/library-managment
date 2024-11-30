const Book = require('../models/magbookModel');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, publisherDate, price, pages, publisher, isbn } = req.body;
  const coverImage = req.file ? req.file.path : '';

  try {
    const newBook = new Book({ title, author, publisherDate, price, pages, publisher, isbn, coverImage });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { title, author, publisherDate, price, pages, publisher, isbn } = req.body;
  const coverImage = req.file ? req.file.path : null; // Set to null if there's no new file

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.publisherDate = publisherDate || book.publisherDate;
    book.price = price || book.price;
    book.pages = pages || book.pages;
    book.publisher = publisher || book.publisher;
    book.isbn = isbn || book.isbn;

    // Only update coverImage if a new file has been uploaded
    if (coverImage) {
      book.coverImage = coverImage;
    }

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
