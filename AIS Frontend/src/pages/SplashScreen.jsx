import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const welcomeText = "Welcome to";
  const systemText = "Automated Interview System";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-screen bg-gradient-to-tr from-green-200 via-cyan-100 to-indigo-200 text-white overflow-hidden px-4">
      
      {/* Title Section */}
      <motion.h1
        className="text-xl sm:text-3xl md:text-5xl font-extrabold text-center break-words flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* "Welcome to" */}
        {welcomeText.split("").map((char, index) => (
          <motion.span
            key={`welcome-${index}`}
            variants={letterVariants}
            className={`inline-block ${char === " " ? "mx-1" : ""} text-gray-900`}
          >
            {char}
          </motion.span>
        ))}

        {/* Space between parts */}
        <span className="inline-block w-2 sm:w-4"></span>

        {/* "Automated Interview System" */}
        <span className="flex flex-wrap justify-center text-gray-800">
          {systemText.split("").map((char, index) => (
            <motion.span
              key={`system-${index}`}
              variants={letterVariants}
              className={`inline-block ${char === " " ? "mx-1" : ""} text-gray-900`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      {/* Spinner */}
      <div className="mt-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-spin-slow"></div>
      </div>

      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-500 to-yellow-500 opacity-30 animate-glow"></div>
    </div>
  );
};

export default SplashScreen;
