import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAllJobs } from '../api/index';
import Cookies from 'js-cookie';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        if (Array.isArray(response)) {
          setJobs(response);
        } else {
          console.error('Response is not an array:', response);
          setError('Failed to load jobs.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded?.role || '');
        setUserId(decoded?.id || '');
      } catch (err) {
        console.error('Invalid token',err);
      }
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleScheduleNow = (jobId, createdBy) => {
    if (userRole !== 'company' || userId !== createdBy) {
      setErrorMessage('You haven\'t created this job, so you cannot schedule an interview.');
      return;
    }
    Cookies.set('jobid', jobId);
    navigate('/schedule_interview');
  };

  const handleApplyNow = (jobId) => {
    Cookies.set('jobid', jobId);
    navigate(`/interview-questions/${jobId}`); // ✅ Matches the defined route
  };
  

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-600 rounded-md shadow-md mb-6">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <span className="text-sm text-gray-400">{job.location}</span>
            </div>

            <p className="text-gray-700 text-sm mb-3">{job.description}</p>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>💼 <span className="font-medium">Company:</span> {job.company?.name || 'N/A'}</p>
              <p>💰 <span className="font-medium">Salary:</span> NPR {job.salary}</p>
            </div>

            {userRole === 'company' ? (
              userId === job.createdBy ? (
                <button
                  onClick={() => handleScheduleNow(job._id, job.createdBy)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition-colors duration-200"
                >
                  Schedule Now
                </button>
              ) : (
                <button className="w-full bg-gray-400 text-white py-2 rounded-xl" disabled>
                  You didn’t create this job
                </button>
              )
            ) : (
              <button
                onClick={() => handleApplyNow(job._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors duration-200"
              >
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
