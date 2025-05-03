const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  schedule_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewSchedule',
    required: true,
  },
  question_text: {
    type: String,
    required: true,
  },
  question_type: {
    type: String,
    enum: ['multiple-choice', 'open-ended'], // Check what enum values you have
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
  correct_answer: {
    type: String,
    required: false,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
