import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getInterviewQuestions, submitAnswers } from '../api/index';

const InterviewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const jobId = Cookies.get('jobid');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getInterviewQuestions(jobId);
        setQuestions(data);
      } catch (err) {
        setError('Failed to fetch questions');
      }
    };

    fetchQuestions();
  }, [jobId]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const question of questions) {
        const answer = answers[question._id] || '';
        await submitAnswer(question._id, answer);
      }
      setSuccess('Answers submitted successfully!');
    } catch (err) {
      setError('Failed to submit answers.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Interview Questions</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={question._id}>
            <label className="block font-medium text-gray-700 mb-1">
              {index + 1}. {question.text}
            </label>
            <textarea
              rows={3}
              value={answers[question._id] || ''}
              onChange={(e) => handleChange(question._id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl w-full"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default InterviewQuestions;
