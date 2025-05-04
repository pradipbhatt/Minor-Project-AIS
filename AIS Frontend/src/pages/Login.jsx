import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginCompany } from "../api"; // Import both login functions
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // New role state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login attempt with data:", { email, password, role });
  
      let response;
      if (role === "company") {
        response = await loginCompany({ email, password });
      } else {
        response = await loginUser({ email, password });
      }
  
      if (response?.token) {
        // Log token received for debugging
        console.log("Received token:", response.token);
  
        // Store token in cookies
        Cookies.set("token", response.token, { expires: 7, path: "/" });
        console.log("Token stored in cookies:", response.token);
  
        // Redirect based on role
        setTimeout(() => {
          if (role === "company") {
            navigate("/company-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }, 100);
      } else {
        setError("Login failed: Token is missing or invalid.");
      }
    } catch (err) {
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

        {/* Role selector */}
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Login as User</option>
          <option value="company">Login as Company</option>
        </select>

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
