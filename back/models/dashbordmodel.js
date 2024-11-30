// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    // Add other fields as necessary
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
