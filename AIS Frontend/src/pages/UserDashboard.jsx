import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import JobsList from "../components/JobsList";
import Hero from "../components/Hero";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = decodeJwt(token);
    const userRole = decodedToken?.role;

    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else if (userRole === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #eef2ff, #ffffff)",
        padding: "1rem",
      }}
    >
      <JobsList />
    </div>
  );
};

// Helper function to decode JWT
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export default Dashboard;
