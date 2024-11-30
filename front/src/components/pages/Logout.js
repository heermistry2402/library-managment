import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to login page after logout
    window.location.href = '/logout'; // Redirect to login, not logout
  }, []);

  return (
    <div className="logout-container">
      <h2 className="text-center">You have been logged out</h2>
      <div className="logout-message text-center">Redirecting to login...</div>

      {/* Login Button */}
      <button
        className="btn btn-primary"
        onClick={() => window.location.href = '/login'}
        style={{ marginTop: '20px' }}
      >
        Go to Login
      </button>

      <style>{`
        .logout-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f8f9fa;
        }
        .logout-container h2 {
          font-size: 24px;
          color: #333;
        }
        .logout-message {
          margin-top: 20px;
          font-size: 18px;
          color: #666;
        }
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Logout;
