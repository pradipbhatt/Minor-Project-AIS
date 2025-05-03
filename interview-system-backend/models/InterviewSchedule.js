const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewScheduleSchema = new Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to Job model
      required: true,
    },
    scheduled_at: {
      type: Date,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to Question model
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewSchedule', interviewScheduleSchema);
