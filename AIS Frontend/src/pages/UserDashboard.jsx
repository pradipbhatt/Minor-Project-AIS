import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import JobsList from "../components/JobsList";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user role from the token or cookies (you can decode the token if it's JWT)
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Assuming the role is embedded in the token payload
    const decodedToken = decodeJwt(token); // Decode the JWT token (you can use a library like `jwt-decode`)
    const userRole = decodedToken?.role;

    // Redirect based on the user's role
    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else if (userRole === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/login"); // In case of an invalid role
    }
  }, [navigate]);

  return (
   <>
   <JobsList/>
   </>
  );
};

// Helper function to decode JWT (if using JWT)
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export default Dashboard;
