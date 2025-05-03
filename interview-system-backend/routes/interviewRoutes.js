const express = require('express');
const router = express.Router();
const { scheduleInterview, getInterviewByJob, submitAnswer, getInterviewResults } = require('../controllers/interviewController');
const { protect } = require('../middlewares/authMiddleware');

// Schedule an interview (Company only)
router.post('/schedule', protect, scheduleInterview);

// Get interview details by Job ID (public)
router.get('/:jobId', getInterviewByJob);

// Submit an answer to a specific question (User only)
router.post('/answer', protect, submitAnswer);

// Get the results of an interview (User/Company)
router.get('/results/:jobId', protect, getInterviewResults);

module.exports = router;
