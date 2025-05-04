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
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const token = getCookie('token'); // Retrieve the token from cookies
      console.log("Token retrieved:", token); // Log the token for debugging
  
      if (!token) {
        setError("Authentication token is missing.");
        return;
      }
  
      // API URL
      const API_URL = "http://localhost:5000/api"; // Update with the correct base URL
  
      // Debugging the header
      console.log("Headers sent:", {
        'Authorization': `Bearer ${token}`,
      });
  
      // Make the POST request directly to the API with token from cookies
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify(jobData),
        credentials: 'include', // Send cookies if needed
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to create job:", data.message);
        setError(data.message || 'Failed to create job');
        return;
      }
  
      const data = await response.json();
      console.log('Job created successfully:', data);
  
      // Redirect to interview scheduling (optional)
      navigate('/company-dashboard');
    } catch (err) {
      console.error('Error creating job:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create Job</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Job Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary (NPR)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating Job...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
