import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import './css/AdminProfile.css';
import Navbar from "../Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Axios for API requests

const RegistrationForm = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userDetails.username || !userDetails.email) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/register', {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      });

      setSuccessMessage("Registration successful");
      setErrorMessage("");
      console.log(response.data); // Optionally log the response
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Server error');
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container className="registration-form-container mt-5">
        {/* Alert for validation messages */}
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}

        <h2 className="text-center mb-4">Admin Profile </h2>

        <Form onSubmit={handleSubmit} className="registration-form mt-4">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={userDetails.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={userDetails.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={userDetails.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default RegistrationForm;
