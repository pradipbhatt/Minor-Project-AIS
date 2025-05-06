const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  registerCompany,
  loginCompany,
  getCompanyDetails,
} = require('../controllers/authController');

// User Registration and Login Routes
router.post('/register/user', registerUser);
router.post('/login/user', loginUser);

// Company Registration and Login Routes
router.post('/register/company', registerCompany);
router.post('/login/company', loginCompany);

// Get company details by ID
router.get('/company/:id', getCompanyDetails);


module.exports = router;
