// services/bookService.js

const Book = require('../models/bookModel'); // Assuming you're using Mongoose or a similar ORM

// Function to fetch all books
const getBooks = async () => {
    try {
        const books = await Book.find(); // Fetches all books from the database
        return books;
    } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
    }
};

// Function to add a book
const addBook = async (bookData) => {
    try {
        const newBook = new Book(bookData); // Create a new book instance
        await newBook.save(); // Save the book to the database
        return newBook;
    } catch (error) {
        throw new Error('Error adding book: ' + error.message);
    }
};

// Function to update a book
const updateBook = async (bookId, bookData) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, { new: true });
        return updatedBook;
    } catch (error) {
        throw new Error('Error updating book: ' + error.message);
    }
};

// Function to delete a book
const deleteBook = async (bookId) => {
    try {
        await Book.findByIdAndDelete(bookId);
    } catch (error) {
        throw new Error('Error deleting book: ' + error.message);
    }
};

// Export all functions
module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
};
