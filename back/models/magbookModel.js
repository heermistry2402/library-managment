const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisherDate: { type: Date, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  publisher: { type: String, required: true },
  coverImage: { type: String },
  isbn: { type: String, required: true, unique: true }
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
