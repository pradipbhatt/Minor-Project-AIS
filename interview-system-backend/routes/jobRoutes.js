// routes/jobRoutes.js
const express = require('express');
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

const { protect, isCompany } = require('../middlewares/authMiddleware');

// Create a job
router.post('/', protect, isCompany, createJob);

// Get all jobs
router.get('/', getJobs);

// Get job by ID
router.get('/:id', getJobById);

// Update job
router.put('/:id', protect, isCompany, updateJob);

// Delete job
router.delete('/:id', protect, isCompany, deleteJob);

module.exports = router;
