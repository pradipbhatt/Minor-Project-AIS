const express = require('express');
const router = express.Router();
const {
  scheduleInterview,
  getInterviewByJob,
  submitAnswer,
  getInterviewResults,
  getQuestionsByScheduleId
} = require('../controllers/interviewController');

const { protect } = require('../middlewares/authMiddleware');

// Schedule an interview (Company only)
router.post('/schedule', protect, scheduleInterview);

// Submit an answer to a specific question (User only)
router.post('/answer', protect, submitAnswer);

// Get the results of an interview (User/Company)
router.get('/results/:jobId', protect, getInterviewResults);

// Get questions by schedule ID
router.get('/questions/:scheduleId', protect, getQuestionsByScheduleId);

// Get interview details by Job ID (public) — keep this last
router.get('/:jobId', getInterviewByJob);

module.exports = router;
