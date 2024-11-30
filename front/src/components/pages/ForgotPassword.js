import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Navbar from "../Navbar";
import './css/ForgotPassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      // Clear error message
      setErrorMessage("");
      setSuccessMessage("");

      // Make API call to update the password
      const response = await axios.post("http://localhost:5000/api/update-password", {
        username,
        currentPassword,
        newPassword,
      });

      // Handle success response
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setUsername("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      // Handle error response
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Server error"
      );
    }
  };

  return (
    <>
      <Navbar />
      <Container className="forgot-password-container mt-5">
        <h2 className="text-center mb-4">Update Password</h2>

        {/* Alert for error messages */}
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}

        {/* Alert for success messages */}
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update Password
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ForgotPassword;
