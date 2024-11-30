import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './css/AddBook.css';
import Navbar from '../Navbar';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publisherDate: '',
    price: '',
    pages: '',
    publisher: '',
    coverImage: null,
    isbn: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookData({ ...bookData, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in bookData) {
      formData.append(key, bookData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/add-book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(response.data.message);
      setBookData({ title: '', author: '', publisherDate: '', price: '', pages: '', publisher: '', coverImage: null, isbn: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add the book');
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <h2 className="text-center mb-4">Add Book</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={bookData.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={bookData.author} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPublisherDate">
            <Form.Label>Publisher Date</Form.Label>
            <Form.Control type="date" name="publisherDate" value={bookData.publisherDate} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={bookData.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPages">
            <Form.Label>Pages</Form.Label>
            <Form.Control type="number" name="pages" value={bookData.pages} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control type="text" name="publisher" value={bookData.publisher} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formCoverImage">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="file" name="coverImage" onChange={handleFileChange} required />
          </Form.Group>

          <Form.Group controlId="formISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" name="isbn" value={bookData.isbn} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">Add Book</Button>
        </Form>
      </Container>
    </>
  );
};

export default AddBook;
