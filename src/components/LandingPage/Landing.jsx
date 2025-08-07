import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";

function Landing() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-[600px] w-full bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

        {/* Decorative Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9B26A]/40 via-white/20 to-[#168A43]/30 blur-3xl rounded-3xl transform scale-110"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#F9B26A]/20 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#168A43]/20 rounded-full filter blur-xl animate-pulse delay-300"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#168A43] to-[#F9B26A] bg-clip-text text-transparent leading-tight mb-4 tracking-tight drop-shadow-md">
              Connect Instantly, Innovate Freely
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto lg:mx-0 font-medium">
              Sandes: Empowering secure communication under India's Atma Nirbhar Bharat initiative.
            </p>

            <div className="flex justify-center lg:justify-center gap-4 items-center ">
              <motion.a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#168A43] to-[#F9B26A] text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:scale-105 transition-transform duration-300"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <FaGooglePlay className="text-xl" />
                Get on Google Play
              </motion.a>

              <motion.a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F9B26A] to-[#168A43] text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:scale-105 transition-transform duration-300"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <FaApple className="text-xl" />
                Get on App Store
              </motion.a>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Available for Android & iOS • 100% secure & private
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex-1 relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <motion.img
                className="w-full max-w-md lg:max-w-lg mx-auto rounded-xl  hover:shadow-2xl h-[30rem]"
                src="assets/images/landing.svg"
                alt="Sandes App Preview"
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <div className="absolute -top-6 -left-6 w-10 h-10 bg-[#F9B26A] rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-[#168A43] rounded-full opacity-40 animate-pulse delay-200"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
