// import { Typography } from "@mui/material";
// import { useState, useRef, useEffect } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// export default function LoginAdmin_Page() {
//   const navigate = useNavigate();

//   const [number, setNumber] = useState("");

//   const [err, setErr] = useState({});
//   const [showOtp, setShowOtp] = useState(false);
//   const otp_length = 5;
//   const [newInput, setNewInput] = useState(new Array(otp_length).fill(""));
//   const inputRef = useRef([]);

//   const loginHandler = async (e) => {
//     e.preventDefault();
//     const trimmedNumber = number.trim();
//     let validationErrors = {};

//     if (!trimmedNumber || !/^\d{10}$/.test(trimmedNumber)) {
//       validationErrors.number = "Please enter a valid 10-digit phone number";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErr(validationErrors);
//       return;
//     }

//     setErr({ number: "" });
//     setShowOtp(true);

//     try {
//       // Replace with your real API call
//       // const res = await axios.post("your-api-url", { number: trimmedNumber });
//       // setNumber("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (showOtp) {
//       inputRef.current[0]?.focus();
//     }
//   }, [showOtp]);

//   const handleInput = (value, index) => {
//     if (isNaN(value)) return;

//     const newVal = value.trim();
//     const newArr = [...newInput];
//     newArr[index] = newVal.slice(-1);
//     setNewInput(newArr);

//     if (newVal && index < otp_length - 1) {
//       inputRef.current[index + 1]?.focus();
//     }
//   };

//   const handleBack = (e, index) => {
//     if (!e.target.value && e.key === "Backspace" && index > 0) {
//       inputRef.current[index - 1]?.focus();
//     }
//   };      

//   const OTP_Verification = () => {
//     const enteredOtp = newInput.join("");

//     if (enteredOtp.length === otp_length) {
//       // Replace this logic with actual OTP verification if needed
//       toast.success("Login Successful !!");
//       // Set user role ID based on number

//       const userRole = number == "9984261451" ? "1" : "2";

//       localStorage.setItem("userRole", userRole);
//       navigate('/Dashboard');
//     } else {
//       toast.error("Invalid OTP");
//     }
//   };

//   const isOtpComplete = newInput.every(item => item !== "");

//   return (
//     <div
//       className="min-h-screen w-full px-4 py-8 flex flex-col items-center"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         overflowX: "hidden",
//       }}
//     >
//       <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
//         <div className="admin_form" style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}>
//           <div className="logo_img" style={{ textAlign: "-webkit-center" }}>
//             <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
//           </div>
//           <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
//             Sandes Authentication Admin Login
//           </Typography>

//           {showOtp ? (
//             <div className="flex justify-center flex-col gap-4 items-center">
//               <div className="bg-[#7DD0AF] p-8 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//                   Enter OTP
//                 </h2>
//                 <div className="flex space-x-4">
//                   {newInput.map((item, index) => (
//                     <input
//                       ref={(input) => (inputRef.current[index] = input)}
//                       key={index}
//                       type="text"
//                       maxLength="1"
//                       value={newInput[index]}
//                       onChange={(e) => handleInput(e.target.value, index)}
//                       onKeyUp={(e) => handleBack(e, index)}
//                       className="w-12 h-12 text-center text-xl font-medium text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
//                       placeholder="-"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 {isOtpComplete && (
//                   <Button onClick={OTP_Verification} className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold">
//                     Verify
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <>
//               <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
//                 Enter your phone number
//               </h1>
//               <form onSubmit={loginHandler} className="space-y-4">
//                 <Input
//                   value={number}
//                   onChange={(e) => setNumber(e.target.value)}
//                   className="text-gray-700 font-semibold"
//                   placeholder="Enter your phone number"
//                   maxLength="10"

//                 />
//                 {err.number && (
//                   <span className="text-red-500 font-medium text-sm block">
//                     {err.number}
//                   </span>
//                 )}
//                 <Button type="submit" className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold">
//                   Generate OTP
//                 </Button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { Typography } from "@mui/material";
// import { useState, useRef, useEffect } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { generateOtp, verifyOtp } from "../../redux/authSlice";

// export default function LoginAdmin_Page() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [number, setNumber] = useState("");
//   const [err, setErr] = useState({});
//   const [otpInput, setOtpInput] = useState(new Array(5).fill(""));
//   const inputRef = useRef([]);

//   const { isOtpSent, isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const handleGenerateOtp = async (e) => {
//     e.preventDefault();
//     let trimmed = number.trim();
//     let validationErrors = {};

//     if (!/^\d{10}$/.test(trimmed)) {
//       validationErrors.number = "Please enter a valid 10-digit phone number";
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErr(validationErrors);
//       return;
//     }

//     setErr({});
//     dispatch(generateOtp(trimmed))
//       .unwrap()
//       .then(() => toast.success("OTP sent successfully"))
//       .catch((err) => toast.error(err));
//   };

//   useEffect(() => {
//     if (isOtpSent) {
//       inputRef.current[0]?.focus();
//     }
//   }, [isOtpSent]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       toast.success("Login successful!");
//       navigate("/Dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleInput = (value, index) => {
//     if (isNaN(value)) return;
//     const newVal = value.trim();
//     const newArr = [...otpInput];
//     newArr[index] = newVal.slice(-1);
//     setOtpInput(newArr);
//     if (newVal && index < otpInput.length - 1) {
//       inputRef.current[index + 1]?.focus();
//     }
//   };

//   const handleBack = (e, index) => {
//     if (!e.target.value && e.key === "Backspace" && index > 0) {
//       inputRef.current[index - 1]?.focus();
//     }
//   };

//   const handleVerifyOtp = () => {
//     const otp = otpInput.join("");
//     if (otp.length !== 5) {
//       toast.error("Please enter a valid 5-digit OTP");
//       return;
//     }

//     dispatch(verifyOtp({ phone: number.trim(), otp }))
//       .unwrap()
//       .catch((err) => toast.error(err));
//   };

//   const isOtpComplete = otpInput.every((val) => val !== "");

//   return (
//     <div className="min-h-screen w-full px-4 py-8 flex flex-col items-center">
//       <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
//         <div className="admin_form" style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}>
//           <div className="logo_img" style={{ textAlign: "-webkit-center" }}>
//             <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
//           </div>
//           <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
//             Sandes Authentication Admin Login
//           </Typography>

//           {isOtpSent ? (
//             <div className="flex justify-center flex-col gap-4 items-center">
//               <div className="bg-[#7DD0AF] p-8 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Enter OTP</h2>
//                 <div className="flex space-x-4">
//                   {otpInput.map((item, index) => (
//                     <input
//                       key={index}
//                       ref={(input) => (inputRef.current[index] = input)}
//                       type="text"
//                       maxLength="1"
//                       value={otpInput[index]}
//                       onChange={(e) => handleInput(e.target.value, index)}
//                       onKeyUp={(e) => handleBack(e, index)}
//                       className="w-12 h-12 text-center text-xl font-medium text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
//                       placeholder="-"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Button
//                   onClick={handleVerifyOtp}
//                   disabled={!isOtpComplete || loading}
//                   className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold"
//                 >
//                   {loading ? "Verifying..." : "Verify"}
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
//                 Enter your phone number
//               </h1>
//               <form onSubmit={handleGenerateOtp} className="space-y-4">
//                 <Input
//                   value={number}
//                   onChange={(e) => setNumber(e.target.value)}
//                   placeholder="Enter your phone number"
//                   maxLength="10"
//                   className="text-gray-700 font-semibold"
//                 />
//                 {err.number && (
//                   <span className="text-red-500 font-medium text-sm block">{err.number}</span>
//                 )}
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold"
//                 >
//                   {loading ? "Sending OTP..." : "Generate OTP"}
//                 </Button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// import { Typography } from "@mui/material";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useKeycloak } from "../../redux/useKeycloak";

// export default function LoginAdmin_Page() {
//   const navigate = useNavigate();
//   const { keycloak, initialized, authenticated } = useKeycloak();

//   useEffect(() => {
//     if (initialized && authenticated) {
//       toast.success("Already logged in!");
//       navigate("/Dashboard");
//     }
//   }, [initialized, authenticated, navigate]);

//   const handleLogin = () => {
//     keycloak.login({
//       redirectUri: window.location.origin + "/Dashboard",
//     });
//   };

//   return (
//     <div
//       className="min-h-screen w-full px-4 py-8 flex flex-col items-center"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         overflowX: "hidden",
//       }}
//     >
//       <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
//         <div
//           className="admin_form"
//           style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}
//         >
//           <div className="logo_img" style={{ textAlign: "-webkit-center" }}>
//             <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
//           </div>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             gutterBottom
//             textAlign="center"
//           >
//             Sandes Authentication Admin Login
//           </Typography>

//           <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
//             Login via Keycloak
//           </h1>

//           <Button
//             onClick={handleLogin}
//             className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold"
//             disabled={!initialized}
//           >
//             Login with Keycloak
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../ui/button"; // Adjust this path or replace with your button
import { Typography } from "@mui/material";
import { useKeycloak } from "../../KeycloakProvider";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { keycloak, initialized, authenticated } = useKeycloak();

  useEffect(() => {
    if (initialized && authenticated) {
      toast.success("Already logged in!");
      // navigate("/Dashboard");
    }
  }, [initialized, authenticated, navigate]);

  // const handleLogin = () => {

  //   keycloak.login({
  //     redirectUri: window.location.origin + "/Dashboard",

  //   });
  // };


  // useEffect(() => {
  //   if (initialized && authenticated) {
  //     toast.success("Login Successfully!");
  //     navigate("/Dashboard");
  //   }
  // }, [initialized, authenticated, navigate]);

  const handleLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + "/Dashboard"
    });
  };
  return (
    <div
      className="min-h-screen w-full px-4 py-8 flex flex-col items-center"
      style={{ backgroundSize: "cover", backgroundPosition: "center", overflowX: "hidden" }}
    >
      <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
        <div
          className="admin_form"
          style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}
        >
          <div className="logo_img" style={{ textAlign: "-webkit-center" }}>
            <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
          </div>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Sandes Authentication Admin Login
          </Typography>

          <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
            Login via Keycloak
          </h1>

          <Button
            onClick={handleLogin}
            className="w-full sm:w-auto cursor-pointer bg-[#7DD0AF] font-semibold"
            disabled={!initialized}
          >
            Login with Keycloak
          </Button>
        </div>
      </div>
    </div>
  );
}
