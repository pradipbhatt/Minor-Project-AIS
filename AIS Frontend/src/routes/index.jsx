import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register"; // Import Register page
import Dashboard from "../pages/UserDashboard";
import UserDashboard from "../pages/UserDashboard"; // User Dashboard page
import AdminDashboard from "../pages/AdminDashboard"; // Admin Dashboard page

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Added Register route */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Base dashboard route */}
      <Route path="/user-dashboard" element={<UserDashboard />} /> {/* User Dashboard */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
