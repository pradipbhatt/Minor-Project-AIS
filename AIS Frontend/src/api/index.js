// src/api.js

import Cookies from "js-cookie";  // Import js-cookie

const API_URL = "http://localhost:5000/api";

// Helper function to handle HTTP requests
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "An error occurred");
  }
  return response.json();
};

// API functions

// Register new user
export const registerUser = async (userData) => {
  const response = await fetchData(`${API_URL}/auth/register/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response;
};

// Login user and store token in cookies
export const loginUser = async (credentials) => {
  const response = await fetchData(`${API_URL}/auth/login/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  // Store token in a cookie on successful login
  Cookies.set("token", response.token, { expires: 7, path: "" });

  return response;
};

// Get all interviews using the token stored in cookies
export const getInterviews = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetchData(`${API_URL}/interviews`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
};

// Create a new interview using token from cookies
export const createInterview = async (interviewData) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetchData(`${API_URL}/interviews`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interviewData),
  });
  return response;
};

// Get details of a specific interview
export const getInterviewDetails = async (id) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetchData(`${API_URL}/interviews/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
};
