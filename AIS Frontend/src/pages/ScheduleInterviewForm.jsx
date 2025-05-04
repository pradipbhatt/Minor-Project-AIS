import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_URL } from '../api/index.js'; // Ensure this points to something like `${BASE_URL}/interview`

const ScheduleInterviewForm = () => {
  const [jobId, setJobId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'open-ended', options: [], correct_answer: '' },
  ]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get jobId from cookie on mount
  useEffect(() => {
    const storedJobId = Cookies.get('jobid');
    if (storedJobId) {
      setJobId(storedJobId);
    } else {
      setStatus({ type: 'error', message: 'No job ID found in cookies.' });
    }
  }, []);

  const handleQuestionChange = (index, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updated = [...questions];
    updated[index].options[optionIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const removeOption = (index, optionIndex) => {
    const updated = [...questions];
    updated[index].options.splice(optionIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { text: '', type: 'open-ended', options: [], correct_answer: '' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token');
    if (!token) {
      return setStatus({ type: 'error', message: 'User not authenticated.' });
    }

    if (!jobId) {
      return setStatus({ type: 'error', message: 'Missing Job ID.' });
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/interviews/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          job_id: jobId,
          scheduled_at: scheduledAt,
          questions,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to schedule interview');
      }

      setStatus({ type: 'success', message: 'Interview scheduled successfully!' });
      setScheduledAt('');
      setQuestions([{ text: '', type: 'open-ended', options: [], correct_answer: '' }]);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Schedule Interview</h2>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Scheduled Date & Time</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Questions</h3>

        {questions.map((q, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2">
            <input
              type="text"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />

            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="open-ended">Open-Ended</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>

            {q.type === 'multiple-choice' && (
              <div>
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Option"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index, optionIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(index)}
                  className="text-blue-600 hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}

            <input
              type="text"
              placeholder="Correct answer"
              value={q.correct_answer}
              onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="text-blue-600 hover:underline"
        >
          + Add Question
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? 'Scheduling...' : 'Schedule Interview'}
      </button>

      {status && (
        <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default ScheduleInterviewForm;
