// controllers/bookController.js
const Book = require('../models/bookModel');

// Get total number of books
const getTotalBooks = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        res.json({ totalBooks });
    } catch (error) {
        console.error('Error fetching total books:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getTotalBooks,
};
