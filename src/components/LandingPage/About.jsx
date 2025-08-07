import React from "react";

function About() {
  return (
    <div className="bg-transparent">
      <div className="min-h-[600px] relative w-full flex flex-col lg:flex-row items-center justify-evenly gap-12 p-6 md:p-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#36904A]/70 via-white/30 to-[#36904A]/50 z-0 blur-3xl rounded-full animate-pulse"></div>

        {/* Image Section */}
        <div className="relative z-10 flex justify-center">
          <div className="relative">
            <img
              className="max-w-xs md:max-w-2xl h-auto rounded-2xl transform hover:scale-105 transition-transform duration-500"
              src="assets/images/about.svg"
              alt="About Sandes"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#36904A]/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="relative z-10 max-w-lg text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#36904A] mb-4 tracking-tight">
            Discover Sandes
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
           Sandes, an initiative of  <span className="font-semibold text-[#36904A]">Atma Nirbhar Bharat</span> under the Digital India Programme, offers an open source based, secure and indigenous instant messaging platform to facilitate G2G, G2C and C2G communication. Sandes is securely hosted on Government infrastructure and thus the strategic control lies with the Govt. The app is available on Google Play Store and Apple App Store for anyone to download.
          </p>
          <p className="text-lg md:text-xl text-gray-700 font-medium mt-4 leading-relaxed">
          Sandes is governed by the Privacy Policy and Data Retention policy as per Govt. requirements. Sandes is based on security first principle and offers end to end encrypted communication. Platform stores only metadata so actual message can’t be reproduced. Sandes has also implemented the originator’s traceability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;