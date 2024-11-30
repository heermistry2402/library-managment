import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Navbar from "../Navbar";
import './css/adduser.css'; // Custom CSS for form styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import axios from 'axios'; // Axios for API calls

const AddUser = () => {
  const [formData, setFormData] = useState({
    Username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    registerDate: '',
    dateOfBirth: '',
    userRole: '',
    userStatus: 'Active', // Default value
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Basic validation
    if (!formData.Username) formErrors.Username = 'User name is required';
    if (!formData.fullName) formErrors.fullName = 'Full Name is required';
    if (!formData.email) formErrors.email = 'Email Address is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.registerDate) formErrors.registerDate = 'Register Date is required';
    if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.userRole) formErrors.userRole = 'User Role is required';

    // If no errors, proceed to send the form data
    if (Object.keys(formErrors).length === 0) {
      setErrors({}); // Clear previous errors
      setSuccessMessage(''); // Clear previous success message

      try {
        console.log('Form data:', formData); // Add this to log form data before submission
        const response = await axios.post('http://localhost:5000/api/new-users/add-new-user', formData);
        console.log('API response:', response.data); // Log the response from the API
        setSuccessMessage('User added successfully!'); // Set success message

        // Reset form fields
        setFormData({
          Username: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          address: '',
          registerDate: '',
          dateOfBirth: '',
          userRole: '',
          userStatus: 'Active', // Reset to default
        });
      } catch (error) {
        console.error('Full error object:', error);

        // Handle error response
        if (error.response) {
          console.error('Error response data:', error.response.data);
          setErrors({
            api: error.response.data?.message || 'Something went wrong on the server. Please try again.'
          });
        } else if (error.request) {
          console.error('No response received:', error.request);
          setErrors({
            api: 'No response from the server. Please check your connection or try again later.'
          });
        } else {
          console.error('Error message:', error.message);
          setErrors({ api: error.message || 'An unexpected error occurred. Please try again.' });
        }
      }
    } else {
      setErrors(formErrors); // Set form validation errors
      setSuccessMessage(''); // Clear success message if there are errors
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <Grid container justifyContent="center" className="add-user-container">
          <Grid item sm={10}>
            <h1 className="text-center">Add User</h1>
            <hr />

            {/* Success Message */}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {/* Error Messages */}
            {errors.api && (
              <div className="alert alert-danger" role="alert">
                {errors.api}
              </div>
            )}
            {Object.keys(errors).length > 0 && !errors.api && (
              <div className="alert alert-danger" role="alert">
                Please fix the errors above and try again.
              </div>
            )}

            {/* Form */}
            <form className="add-user-form" onSubmit={handleSubmit}>
              {/* Form Fields with validation and error handling */}
              <div className="form-group mb-3">
                <TextField
                  label="User name"
                  variant="outlined"
                  fullWidth
                  required
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  error={!!errors.Username}
                  helperText={errors.Username}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </div>

              <div className="form-group mb-3">
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                  name="address"
                  multiline
                  rows={4}
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </div>

              {/* Register Date Field */}
              <div className="form-group mb-3">
                <TextField
                  label="Register Date"
                  variant="outlined"
                  fullWidth
                  required
                  name="registerDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true, // Keeps the label above the field when a date is selected
                  }}
                  value={formData.registerDate}
                  onChange={handleChange}
                  error={!!errors.registerDate}
                  helperText={errors.registerDate}
                />
              </div>

              {/* Date of Birth Field */}
              <div className="form-group mb-3">
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  required
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                />
              </div>

              {/* User Role Dropdown */}
              <div className="form-group mb-3">
                <FormControl fullWidth required error={!!errors.userRole}>
                  <InputLabel>User Role</InputLabel>
                  <Select
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleChange}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                  {errors.userRole && <p className="error-text">{errors.userRole}</p>}
                </FormControl>
              </div>

              {/* User Status Dropdown */}
              <div className="form-group mb-3">
                <FormControl fullWidth>
                  <InputLabel>User Status</InputLabel>
                  <Select
                    name="userStatus"
                    value={formData.userStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="add-user-button"
                >
                  Add User
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddUser;
