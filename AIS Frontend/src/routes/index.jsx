import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import CreateJobForm from "../components/CreateJobForm";
import ScheduleInterviewForm from "../pages/ScheduleInterviewForm";
import InterviewQuestions from "../pages/InterviewQuestions";
import Footer from "../components/Footer";  // Import Footer component

const AppRoutes = () => {
  const token = Cookies.get("token");
  const isAuthenticated = !!token;

  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/company-dashboard" element={<AdminDashboard />} />
            <Route path="/create-job" element={<CreateJobForm />} />
            <Route path="/schedule_interview" element={<ScheduleInterviewForm />} />
            <Route path="/interview-questions/:jobId" element={<InterviewQuestions />} />
            <Route path="*" element={<Navigate to="/" />} />
            
       
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
