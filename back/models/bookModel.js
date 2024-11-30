const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisherDate: { type: Date, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  publisher: { type: String, required: true },
  coverImage: { type: String }, // File path for cover image
  isbn: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
