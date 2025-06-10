import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

function Otp() {
  const otp_length = 5;
  const [newInput, setNewInput] = useState(new Array(otp_length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleInput = (value, index) => {
    if (isNaN(value)) return;

    const newVal = value.trim();
    const newArr = [...newInput];
    newArr[index] = newVal.slice(-1);
    setNewInput(newArr);
    if (newVal && index < otp_length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBack = (e, index) => {
    if (!e.target.value && e.key === "Backspace" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  // Check if all OTP inputs are filled
  const isOtpComplete = newInput.every(item => item !== "");

  return (
    <div className="flex justify-center flex-col gap-4 items-center">
      <div className="bg-[#7DD0AF] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enter OTP
        </h2>
        <div className="flex space-x-4">
          {newInput.map((item, index) => (
            <input
              ref={(input) => (inputRef.current[index] = input)}
              key={index}
              type="text"
              maxLength="1"
              value={newInput[index]}
              onChange={(e) => handleInput(e.target.value, index)}
              onKeyUp={(e) => handleBack(e, index)}
              className="w-12 h-12 text-center text-xl font-medium text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              placeholder="-"
            />
          ))}
        </div>
      </div>
      <div>
        {/* Conditionally render the Verify button if the OTP is complete */}
        {isOtpComplete && (
          <Button
            variant="outline"
            className="cursor-pointer bg-[#7DD0AF] px-16 text-white"
          >
            Verify
          </Button>
        )}
      </div>
    </div>
  );
}

export default Otp;
