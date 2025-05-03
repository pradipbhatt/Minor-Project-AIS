const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  answer_text: { type: String, required: true },
  score: { type: Number },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);
