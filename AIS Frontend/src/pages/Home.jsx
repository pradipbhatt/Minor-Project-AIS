import { Link } from "react-router-dom";
import JobsList from "../components/JobsList";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-heading font-bold mb-6">Automated Interview System</h1>
      <div className="space-x-4">
        <JobsList />
      </div>
    </div>
  );
};

export default Home;
