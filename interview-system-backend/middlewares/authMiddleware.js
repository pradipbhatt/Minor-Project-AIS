const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

// Protect Routes (check if user is logged in)
const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user or company based on decoded ID
    if (decoded.role === 'user') {
      req.user = await User.findById(decoded.id).select('-password');
    } else if (decoded.role === 'company') {
      req.company = await Company.findById(decoded.id).select('-password');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Check if the user is a company (protect company routes)
const isCompany = (req, res, next) => {
  if (req.company) {
    return next();
  }
  res.status(403).json({ message: 'Access denied. Only company can access this route.' });
};

module.exports = { protect, isCompany };
