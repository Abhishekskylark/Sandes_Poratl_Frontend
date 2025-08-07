import React, { useState } from "react";
import sandes_logo from "../assets/sandes_logo.png";
import icon from "../assets/icon.png";
import qr from "../assets/qr.webp";
import phone from "../assets/phone.png";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import backgroundImg from "../assets/bg.jpg";
import Otp from "./Otp";

function Login() {
  const [number, setNumber] = useState("");
  const [err, setErr] = useState({});
  const [isQrMode, setIsQrMode] = useState(true);
  const [showOtp, setShowOtp] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    const trimmedNumber = number.trim();
    let validationErrors = {};

    if (!trimmedNumber || !/^\d{10}$/.test(trimmedNumber)) {
      validationErrors.number = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErr(validationErrors);
      return;
    }
    setErr({ number: "" });
    setShowOtp(true);

    try {
      // const res = await axios.post("your-api-url", { number: trimmedNumber });
      setNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full px-4 py-8 flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowX: "hidden",
      }}
    >
      <div className="text-center space-y-2">
        <img
          className="w-20 sm:w-24 mx-auto"
          src={sandes_logo}
          alt="sandes_logo"
        />
        <h1 className="text-2xl sm:text-4xl font-semibold text-blue-950">
          Start Using Sandes on Web
        </h1>
        <p className="text-base sm:text-lg font-medium text-blue-950">
          Enhance your communication with faster access via
          Sandes app
        </p>
      </div>

      <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
        {isQrMode ? (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-950">
              Login to Sandes web
            </h2>
            <p className="text-base sm:text-xl font-medium text-blue-950">
              Message privately with friends and family using Sandes on your
              browser.
            </p>
            <ol className="text-sm sm:text-base font-medium text-blue-950 space-y-2 text-left sm:text-center">
              <li>1. Open Sandes on your phone</li>
              <li>2. Tap Menu on Android or Setting on iPhone</li>
              <li>3. Tap Linked devices and then Link devices</li>
              <li>4. Point your phone at this screen to scan the QR code</li>
            </ol>
            <motion.img
              src={icon}
              alt="icon"
              className="w-8 mx-auto"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
            <img
              src={qr}
              alt="qr"
              className="w-48 h-48 sm:w-60 sm:h-60 mx-auto"
            />
            <div className="border-t border-gray-300 pt-4">
              <div
                className="flex gap-2 items-center justify-center cursor-pointer"
                onClick={() => setIsQrMode(false)}
              >
                <p className="text-sm font-semibold text-[#7DD0AF]">
                  Login with your phone
                </p>
                <img src={phone} alt="phone" className="w-6 sm:w-8" />
              </div>
            </div>
          </>
        ) : (
          <>
            {showOtp ? (
              <Otp />
            ) : (
              <>
                <h1 className="text-xl sm:text-2xl font-semibold text-blue-950">
                  Enter your phone number
                </h1>
                <form onSubmit={loginHandler} className="space-y-4">
                  <Input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-gray-700 font-semibold"
                    placeholder="Enter your phone number"
                  />
                  {err.number && (
                    <span className="text-red-500 font-medium text-sm block">
                      {err.number}
                    </span>
                  )}
                  <Button type="submit" className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold">
                    Generate OTP
                  </Button>
                </form>
                <p
                  className="text-gray-600 font-semibold cursor-pointer border-b-2 border-[#7DD0AF] w-fit mx-auto mt-2"
                  onClick={() => setIsQrMode(true)}
                >
                  Login with QR {">"}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
