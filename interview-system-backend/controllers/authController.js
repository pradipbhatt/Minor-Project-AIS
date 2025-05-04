const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id, 'user');

    // Set token in cookies (HTTP-only and secure)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      maxAge: 3600000, // 1 hour
      path: '/', // Cookie is valid for all routes
    });

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, 'user');

    // Log the generated token on the server side for debugging purposes
    console.log("Generated Token:", token);

    // Set the token in cookies (HTTP-only and secure)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure flag for production
      maxAge: 3600000, // 1 hour
      path: '/', // Cookie is valid for all routes
    });

    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token as part of the response (if needed on the client side)
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};

// Register a new company
const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
    });

    await newCompany.save();

    const token = generateToken(newCompany._id, 'company');

    // Set token in cookies (HTTP-only and secure)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure flag for production
      maxAge: 3600000, // 1 hour
      path: '/', // Cookie is valid for all routes
    });

    res.status(201).json({
      message: 'Company registered successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an existing company
const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the company by email
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: company._id, role: 'company' }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Set token expiration time as needed
    });

    // Set token in cookies
    res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie can't be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // Cookie is valid for all routes
    });

    // Send the token along with the success message
    res.status(200).json({
      message: 'Login successful',
      token: token,  // Include the token in the response body
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};


// Middleware to check if the user is authenticated
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access user data from req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = { registerUser, loginUser, registerCompany, loginCompany, protect };
