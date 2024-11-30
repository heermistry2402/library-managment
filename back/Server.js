// server.js (or your main server file)

const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Adjusted for the correct path
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append date to avoid name conflicts
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Import routes
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const authchRoutes = require('./routes/authchRoutes');
const bookRoutes = require('./routes/bookRoutes');
const magbookRoutes = require('./routes/magbookRoutes');
const clientRoutes = require('./routes/clientRoutes');
const dashbordroutes = require('./routes/dashbordroutes.js');

// Use routes
app.use('/api', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', authchRoutes);
app.use('/api', bookRoutes);
app.use('/api', magbookRoutes);
app.use('/api/', clientRoutes);
app.use('/api', dashbordroutes);

// Connect to the database
connectDB();

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
