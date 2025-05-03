// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import the loginUser function
import Cookies from "js-cookie"; // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the login data before making the API call
      console.log("Login attempt with data:", { email, password });

      // Call the loginUser function from api.js
      const response = await loginUser({ email, password });

      // Log the response from the API
      console.log("API Response:", response);

      // Check if the token is available in the response
      if (response && response.token) {
        // Store token in cookies
        Cookies.set("token", response.token, { expires: 7, path: "" });
        console.log("Token stored in cookies:", response.token);

        // Wait for a moment before navigating (to ensure the cookie is set first)
        setTimeout(() => {
          navigate("/dashboard");
        }, 100); // Adjust the timeout if needed (100ms delay)
      } else {
        setError("Login failed: Token is missing or invalid.");
      }
    } catch (err) {
      // Log any errors
      console.error("Error during login:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
