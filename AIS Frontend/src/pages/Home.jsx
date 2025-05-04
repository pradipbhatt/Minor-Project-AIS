// src/pages/Home.jsx

import { Link } from "react-router-dom";
import JobsList from "../components/JobsList";

const Home = () => {
  return (
   <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Automated Interview System</h1>
      <div className="space-x-4">
       <JobsList/>
      </div>
    </div>
   </>
  );
};

export default Home;
