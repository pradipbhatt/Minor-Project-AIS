import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginCompany } from "../api";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user");
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
        console.log("Received token:", response.token);
        Cookies.set("token", response.token, { expires: 7, path: "/" });
        console.log("Token stored in cookies:", response.token);

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
    <div className="flex items-center justify-center h-screen bg-gradient-to-b white">
      <div className="bg-white p-8 rounded-2xl shadow-2xl  border-purple-400 transition-transform transform hover:scale-105 duration-300 w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700 animate-pulse">
          Login
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-blue-100 p-4 rounded-lg">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 text-sm text-purple-700 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 text-sm text-purple-700 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>

          <select
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Login as User</option>
            <option value="company">Login as Company</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-800 transition-all font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
