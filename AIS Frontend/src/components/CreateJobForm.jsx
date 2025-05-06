import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility to read cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const CreateJobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    expiresInDays: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getCookie('token');
      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      const API_URL = "http://localhost:5000/api";

      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...jobData,
          salary: Number(jobData.salary),
          expiresInDays: Number(jobData.expiresInDays),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create job');
        return;
      }

      navigate('/company-dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundColor: "#FFFBF0" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center drop-shadow">
          Create Job
        </h2>

        {error && (
          <p className="text-red-700 mb-4 bg-red-100 p-2 rounded text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">
              Job Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
              Salary (NPR)
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="expiresInDays" className="block text-sm font-medium text-gray-600">
              Expires In (Days)
            </label>
            <input
              type="number"
              id="expiresInDays"
              name="expiresInDays"
              value={jobData.expiresInDays}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Job..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
