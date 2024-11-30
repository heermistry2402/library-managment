const Book = require('../models/magbookModel');

const getBooks = async () => {
  return await Book.find();
};

const createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const updateBook = async (id, bookData) => {
  return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

const deleteBook = async (id) => {
  return await Book.findByIdAndRemove(id);
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
