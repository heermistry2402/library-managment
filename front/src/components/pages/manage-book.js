import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import Navbar from '../Navbar'; // Import your Navbar
import axios from 'axios';
import './css/managebook.css'; // Import the CSS file

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null); // State to hold the uploaded cover image file

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-books');
        setBooks(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-book/${id}`);
        setSuccessMessage('Book deleted successfully');
        setBooks(books.filter(book => book._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete the book');
      }
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setEditMode(true);
    setCoverImageFile(null); // Reset the cover image file state
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', currentBook.title);
      formData.append('author', currentBook.author);
      formData.append('publisherDate', currentBook.publisherDate);
      formData.append('price', currentBook.price);
      formData.append('pages', currentBook.pages);
      formData.append('publisher', currentBook.publisher);
      formData.append('isbn', currentBook.isbn);
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile); // Append the file only if it exists
      }

      const response = await axios.put(`http://localhost:5000/api/update-book/${currentBook._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      setSuccessMessage('Book updated successfully');
      setBooks(books.map(book => (book._id === currentBook._id ? response.data : book)));
      setEditMode(false);
      setCurrentBook(null);
      setCoverImageFile(null); // Reset the cover image file state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update the book');
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <h2 className="text-center mb-4">Manage Books</h2>
        <div className="table-responsive">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Publisher Date</th>
                <th>Price</th>
                <th>Pages</th>
                <th>Publisher</th>
                <th>Cover Image</th>
                <th>ISBN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{new Date(book.publisherDate).toLocaleDateString()}</td>
                  <td>{book.price}</td>
                  <td>{book.pages}</td>
                  <td>{book.publisher}</td>
                  <td>
                    {book.coverImage ? (
                      <img src={`http://localhost:5000/uploads/${book.coverImage}`} alt={book.title} className="cover-image" />
                    ) : (
                      <span>No Image Available</span>
                    )}
                  </td>
                  <td>{book.isbn}</td>
                  <td>
                    <Button variant="warning" className="mr-2" onClick={() => handleEdit(book)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Edit Book Modal */}
        <Modal show={editMode} onHide={() => setEditMode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentBook?.title || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentBook?.author || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Publisher Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={currentBook?.publisherDate?.slice(0, 10) || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, publisherDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={currentBook?.price || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, price: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Pages</label>
                <input
                  type="number"
                  className="form-control"
                  value={currentBook?.pages || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, pages: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Publisher</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentBook?.publisher || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, publisher: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setCoverImageFile(e.target.files[0])} // Set the file here
                />
              </div>
              <div className="form-group">
                <label>ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentBook?.isbn || ''}
                  onChange={(e) => setCurrentBook({ ...currentBook, isbn: e.target.value })}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditMode(false)}>Close</Button>
            <Button variant="primary" onClick={handleUpdate}>Update Book</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ManageBooks;
