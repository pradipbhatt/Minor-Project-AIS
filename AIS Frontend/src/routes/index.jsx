import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import CreateJobForm from "../components/CreateJobForm";
import ScheduleInterviewForm from "../pages/ScheduleInterviewForm";
import InterviewQuestions from "../pages/InterviewQuestions.jsx";  // Import InterviewQuestions component

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/user-dashboard" element={<UserDashboard />} />
    <Route path="/company-dashboard" element={<AdminDashboard />} />
    <Route path="/create-job" element={<CreateJobForm />} />
    {/* Schedule interview */}
    <Route path="/schedule_interview" element={<ScheduleInterviewForm />} />
    {/* Interview Questions page for a specific job */}
    <Route path="/interview-questions/:jobId" element={<InterviewQuestions />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes;
