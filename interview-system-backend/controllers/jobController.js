// controllers/jobController.js
const Job = require('../models/Job');

// Create a new job
const createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      company: req.company._id,    // from isCompany middleware
      createdBy: req.company._id,
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error: error.message });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job details', error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    const updatedJob = await job.save();

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
