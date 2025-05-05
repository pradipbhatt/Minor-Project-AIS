import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, registerCompany } from "../api";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      console.log("Sending registration data:", formData);

      let response;
      if (formData.role === "company") {
        response = await registerCompany(formData);
      } else {
        response = await registerUser(formData);
      }

      if (response?.token) {
        Cookies.set("token", response.token, { expires: 7, path: "" });
        console.log("Token stored in cookies:", response.token);
      }

      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background transition-all duration-300 ease-in-out">
      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow-xl p-8 rounded-2xl w-full max-w-md hover:shadow-2xl transition duration-300 ease-in-out border border-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

        {error && <p className="text-error text-center mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text placeholder-muted"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text placeholder-muted"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text placeholder-muted"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 cursor-pointer text-muted hover:text-primary transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text placeholder-muted"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-3 cursor-pointer text-muted hover:text-primary transition"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-text"
        >
          <option value="user">Register as User</option>
          <option value="company">Register as Company</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary text-surface p-3 rounded-lg hover:bg-secondary transition duration-300 font-semibold"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
