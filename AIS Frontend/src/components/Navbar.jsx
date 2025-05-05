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
      const decoded = jwtDecode(token);
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
    location.pathname === path ? "underline text-text" : "";

  return (
    <nav className="bg-surface shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-surface">InterviewSystem</div>

      <div className="flex space-x-4">
        <Link
          to="/"
          className={`text-muted hover:text-primary-light font-medium ${isActive("/")}`}
        >
          Home
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className={`text-muted hover:text-primary-light font-medium ${isActive("/login")}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-muted hover:text-primary-light font-medium ${isActive("/register")}`}
            >
              Register
            </Link>
          </>
        )}

        {token && role === "user" && (
          <Link
            to="/user-dashboard"
            className={`text-muted hover:text-primary-light font-medium ${isActive("/user-dashboard")}`}
          >
            User Dashboard
          </Link>
        )}

        {token && role === "admin" && (
          <Link
            to="/admin-dashboard"
            className={`text-muted hover:text-primary-light font-medium ${isActive("/admin-dashboard")}`}
          >
            Admin Dashboard
          </Link>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="text-error font-medium hover:text-error-dark"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
