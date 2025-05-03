const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // Import cookie-parser

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser()); // Add cookie-parser middleware

// Enable CORS (Cross-Origin Resource Sharing)
// Enable CORS for Vite frontend and allow cookies
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true,               // Allow sending cookies
  })
);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));      // Auth routes for login/register
app.use('/api/jobs', require('./routes/jobRoutes'));       // Routes for job operations
app.use('/api/interviews', require('./routes/interviewRoutes')); // Routes for interview operations

// Error Handling Middleware (to catch any unhandled routes or server errors)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global Error Handler (for all other errors)
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
});

// Set up the port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
