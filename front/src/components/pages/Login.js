import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import React, { useState } from 'react';
import './css/Login.css'; // Import the CSS file for styling
import axios from 'axios'; // Import axios for API requests
import adminImage from 'file:///D:/react%20project/admin/frotend/p1.jpeg'; // Adjust the path to your image

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { 
        username, 
        password 
      });
      
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.token); // Save the token to localStorage
      localStorage.setItem('username', username); // Save the username to localStorage

      // Redirect to dashboard on successful login
      window.location.href = '/dashboard'; 
    } catch (err) {
      console.error(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img 
          src={adminImage}
          alt="Admin Logo"
          className="admin-logo img-fluid mb-4"
        />
        <h2 className="text-center">Admin Login</h2>
        
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input 
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit" className="btn btn-secondary btn-block">
          Login
        </button>

        <div className="forgot-password text-center mt-2">
          <a href="/AdminProfile">Create New User?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
