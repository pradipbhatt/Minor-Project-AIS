import React from 'react';
import illustrationImage from '/hero1.png'; // Update the path to your image

const Hero = () => {
  return (
    <section className="hero-section bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Text */}
          <div className="text-left flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">
              Welcome to Our Automated Interview System
            </h1>
            <p className="text-lg text-text">
              The future of recruitment is here. Our platform offers automated interview scheduling,
              real-time question responses, and much more. Start your journey with us today!
            </p>
            <p className="text-sm text-muted">
              Whether you are a job seeker or a company, our system simplifies the interview process
              with ease. Find your next job or schedule an interview in just a few clicks.
            </p>
            <a
              href="#jobs"
              className="inline-block px-6 py-3 mt-4 bg-primary text-white rounded-xl shadow-md hover:bg-primary/80 transition-colors duration-200"
            >
              Explore Jobs
            </a>
          </div>

          {/* Right Column - Illustration Image */}
          <div className="flex justify-center items-center">
            <img
              src={illustrationImage}
              alt="Automated Interview Illustration"
              className="w-full max-w-lg rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
