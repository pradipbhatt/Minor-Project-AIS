import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, registerCompany } from "../api";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import fwu from "/fwu.jpg";

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
      let response;
      if (formData.role === "company") {
        response = await registerCompany(formData);
      } else {
        response = await registerUser(formData);
      }

      if (response?.token) {
        Cookies.set("token", response.token, { expires: 7, path: "/" });
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fwu})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 text-surface drop-shadow-md">
          Register
        </h2>

        {error && (
          <p className="text-error text-sm text-center mb-4 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60 backdrop-blur text-text placeholder-muted"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60 backdrop-blur text-text placeholder-muted"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60 backdrop-blur text-text placeholder-muted"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 cursor-pointer text-muted hover:text-primary transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60 backdrop-blur text-text placeholder-muted"
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
          className="w-full p-3 mb-6 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60 backdrop-blur text-text"
        >
          <option value="user">Register as User</option>
          <option value="company">Register as Company</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary text-surface p-3 rounded-lg hover:bg-secondary transition duration-300 font-semibold shadow-lg"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
