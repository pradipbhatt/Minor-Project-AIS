const express = require('express');
const router = express.Router();
const { registerUser, loginUser, registerCompany, loginCompany } = require('../controllers/authController');

// User Registration and Login Routes
router.post('/register/user', registerUser);    // Register a new user
router.post('/login/user', loginUser);          // Login an existing user

// Company Registration and Login Routes
router.post('/register/company', registerCompany);  // Register a new company
router.post('/login/company', loginCompany);        // Login an existing company

module.exports = router;
