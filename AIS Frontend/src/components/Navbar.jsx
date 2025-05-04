import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token); // Fixed typo here
      role = decoded?.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "underline text-blue-600" : "";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">InterviewSys</div>

      <div className="flex space-x-4">
        <Link
          to="/"
          className={`text-gray-700 hover:text-blue-600 font-medium ${isActive("/")}`}
        >
          Home
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className={`text-gray-700 hover:text-blue-600 font-medium ${isActive("/login")}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-gray-700 hover:text-blue-600 font-medium ${isActive("/register")}`}
            >
              Register
            </Link>
          </>
        )}

        {token && role === "user" && (
          <Link
            to="/user-dashboard"
            className={`text-gray-700 hover:text-blue-600 font-medium ${isActive("/user-dashboard")}`}
          >
            User Dashboard
          </Link>
        )}

        {token && role === "admin" && (
          <Link
            to="/admin-dashboard"
            className={`text-gray-700 hover:text-blue-600 font-medium ${isActive("/admin-dashboard")}`}
          >
            Admin Dashboard
          </Link>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:text-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
