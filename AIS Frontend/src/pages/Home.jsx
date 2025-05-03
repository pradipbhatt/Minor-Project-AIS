// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Automated Interview System</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
