// import { Typography } from "@mui/material";
// import { useState, useRef, useEffect } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import ReCAPTCHA from "react-google-recaptcha";

// const RECAPTCHA_SITE_KEY = "6LfAeWsrAAAAALbUorst-4I4pqAlFsMtPv4lQYJk";

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



// import React, { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginAdmin } from "../../redux/authSlice";
// import { Button } from "../ui/button";
// import { Typography, TextField, CircularProgress } from "@mui/material";
// import ReCAPTCHA from "react-google-recaptcha";

// const RECAPTCHA_SITE_KEY = "6LfAeWsrAAAAALbUorst-4I4pqAlFsMtPv4lQYJk";

// export default function LoginAdmin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const { loading } = useSelector((state) => state.auth);
//   const recaptchaRef = useRef(null);

//   const handleCustomLogin = async () => {
//     if (!captchaVerified) {
//       toast.error("Please verify the CAPTCHA first.");
//       return;
//     }

//     // 👇 Get selected role silently
//     const role = localStorage.getItem("selected_role");

//     const ROLE_IDS = {
//       "super-admin": 1,
//       "ministry-admin": 2,
//       "o-admin": 3,
//       "ou-admin": 4,
//     };

//     const roles_id = role ? ROLE_IDS[role.toLowerCase()] : undefined;

//     const result = await dispatch(loginAdmin({ mobile, password, roles_id }));


//     if (loginAdmin.fulfilled.match(result)) {
//       toast.success("Login successful!");
//       console.log("result.payload.user", result.payload.user.allRoles);

//       localStorage.setItem("token", result.payload.token);
//       localStorage.setItem("roleid", result.payload.user.roleId);
//       localStorage.setItem("role", result.payload.user.role);
//       localStorage.setItem("mobile", result.payload.user.username);
//       localStorage.setItem("AllRoles", JSON.stringify(result.payload.user.allRoles));
//       localStorage.removeItem("selected_role"); // clean up
//       navigate("/Dashboard");
//     } else {
//       toast.error(result.payload || "Login failed");
//       recaptchaRef.current.reset();
//       setCaptchaVerified(false);
//     }
//   };

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

//           <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
//             Login via Mobile Number
//           </h1>

//           <TextField
//             fullWidth
//             label="Mobile Number"
//             variant="outlined"
//             margin="normal"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div className="my-4 flex">
//             <ReCAPTCHA
//               ref={recaptchaRef}
//               sitekey={RECAPTCHA_SITE_KEY}
//               onChange={() => setCaptchaVerified(true)}
//               onExpired={() => setCaptchaVerified(false)}
//             />
//           </div>

//           <Button
//             onClick={handleCustomLogin}
//             className="w-full sm:w-auto cursor-pointer bg-[#003566] font-semibold"
//             disabled={loading || !captchaVerified}
//           >
//             {loading ? <CircularProgress size={24} /> : "Login"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }














// import React, { useState, useRef , useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginAdmin } from "../../redux/authSlice";
// import { Button } from "../ui/button";
// import { Typography, TextField, CircularProgress } from "@mui/material";
// import ReCAPTCHA from "react-google-recaptcha";

// const RECAPTCHA_SITE_KEY = "6LfAeWsrAAAAALbUorst-4I4pqAlFsMtPv4lQYJk";

// export default function LoginAdmin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const { loading } = useSelector((state) => state.auth);
//   const recaptchaRef = useRef(null);

//   // ✅ Set selected_role from last_logged_in_role if not present
//   useEffect(() => {
//     const selectedRole = localStorage.getItem("selected_role");
//     const lastLoggedIn = localStorage.getItem("last_logged_in_role");

//     if (!selectedRole && lastLoggedIn) {
//       localStorage.setItem("selected_role", lastLoggedIn);
//     }
//   }, []);

//   const handleCustomLogin = async () => {
//     if (!captchaVerified) {
//       toast.error("Please verify the CAPTCHA first.");
//       return;
//     }

//     // ✅ Check if trying to login with different mobile than before
//     const prevMobile = localStorage.getItem("mobile");
//     if (prevMobile && mobile !== prevMobile) {
//       toast.error("Mobile number does not match previously logged in user.");
//       return;
//     }

//     const role = localStorage.getItem("selected_role");

//     const ROLE_IDS = {
//       "super-admin": 1,
//       "ministry-admin": 2,
//       "o-admin": 3,
//       "ou-admin": 4,
//     };

//     const roles_id = role ? ROLE_IDS[role.toLowerCase()] : undefined;

//     const result = await dispatch(loginAdmin({ mobile, password, roles_id }));

//     if (loginAdmin.fulfilled.match(result)) {
//       toast.success("Login successful!");

//       const user = result.payload.user;

//       localStorage.setItem("token", result.payload.token);
//       localStorage.setItem("roleid", user.roleId);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("mobile", user.username);
//       localStorage.setItem("AllRoles", JSON.stringify(user.allRoles));
//       localStorage.setItem("last_logged_in_role", user.role); // ✅ Save last role
//       localStorage.removeItem("selected_role"); // cleanup

//       navigate("/Dashboard");
//     } else {
//       toast.error(result.payload || "Login failed");
//       recaptchaRef.current.reset();
//       setCaptchaVerified(false);
//     }
//   };

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

//           <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
//             Login via Mobile Number
//           </h1>

//           <TextField
//             fullWidth
//             label="Mobile Number"
//             variant="outlined"
//             margin="normal"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div className="my-4 flex">
//             <ReCAPTCHA
//               ref={recaptchaRef}
//               sitekey={RECAPTCHA_SITE_KEY}
//               onChange={() => setCaptchaVerified(true)}
//               onExpired={() => setCaptchaVerified(false)}
//             />
//           </div>

//           <Button
//             onClick={handleCustomLogin}
//             className="w-full sm:w-auto cursor-pointer bg-[#003566] font-semibold"
//             disabled={loading || !captchaVerified}
//           >
//             {loading ? <CircularProgress size={24} /> : "Login"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin } from "../../redux/authSlice";
import { Button } from "../ui/button";
import { Typography, TextField, CircularProgress } from "@mui/material";

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const canvasRef = useRef(null);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const selectedRole = localStorage.getItem("selected_role");
    const lastLoggedIn = localStorage.getItem("last_logged_in_role");

    if (!selectedRole && lastLoggedIn) {
      localStorage.setItem("selected_role", lastLoggedIn);
    }

    generateCaptcha();
  }, []);

  const generateCaptchaText = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";

    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 20;
      const y = 30 + Math.random() * 5;
      const angle = (Math.random() - 0.5) * 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
    }
  };

  const generateCaptcha = () => {
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    drawCaptcha(newText);
    setUserCaptcha("");
    setCaptchaVerified(false);
  };

  useEffect(() => {
    if (userCaptcha.length === captchaText.length && captchaText.length > 0) {
      if (userCaptcha === captchaText) {
        setCaptchaVerified(true);
      } else {
        setCaptchaVerified(false);
      }
    } else {
      setCaptchaVerified(false);
    }
  }, [userCaptcha, captchaText]);

  const handleCustomLogin = async () => {
    if (!captchaVerified) {
      toast.error("CAPTCHA is incorrect. Please try again.");
      generateCaptcha();
      return;
    }

    const prevMobile = localStorage.getItem("mobile");
    if (prevMobile && mobile !== prevMobile) {
      toast.error("Mobile number does not match previously logged in user.");
      return;
    }

    const role = localStorage.getItem("selected_role");
    const ROLE_IDS = {
      "super-admin": 1,
      "ministry-admin": 2,
      "o-admin": 3,
      "ou-admin": 4,
    };

    const roles_id = role ? ROLE_IDS[role.toLowerCase()] : undefined;
    const result = await dispatch(loginAdmin({ mobile, password, roles_id }));

    if (loginAdmin.fulfilled.match(result)) {
      toast.success("Login successful!");
      const user = result.payload.user;

      localStorage.setItem("token", result.payload.token);
      localStorage.setItem("roleid", user.roleId);
      localStorage.setItem("role", user.role);
      localStorage.setItem("mobile", user.username);
      localStorage.setItem("AllRoles", JSON.stringify(user.allRoles));
      localStorage.setItem("last_logged_in_role", user.role);
      localStorage.removeItem("selected_role");

      navigate("/Dashboard");
    } else {
      toast.error(result.payload || "Login failed");
      generateCaptcha();
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
        <div className="admin_form" style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}>
          <div className="logo_img" style={{ textAlign: "-webkit-center" }}>
            <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
          </div>

          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Sandes Authentication Admin Login
          </Typography>

          <h1 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-3">
            Login via Mobile Number
          </h1>

          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="my-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <canvas ref={canvasRef} width="160" height="50" style={{ border: "1px solid #ccc" }} />
              <TextField
                label="Text from image"
                fullWidth
                variant="outlined"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
              />
              <Button onClick={generateCaptcha}>⟳</Button>
            </div>
          </div>

          <Button
            onClick={handleCustomLogin}
            className="w-full sm:w-auto cursor-pointer bg-[#003566] font-semibold"
            disabled={loading || !captchaVerified}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
