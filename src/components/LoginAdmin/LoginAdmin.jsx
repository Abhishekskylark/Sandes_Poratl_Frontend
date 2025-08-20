import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCaptcha, verifyCaptcha, loginAdmin } from "../../redux/authSlice";
import { Button } from "../ui/button";
import { Typography, TextField, CircularProgress } from "@mui/material";

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState("");
  const [captchaColor, setCaptchaColor] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const { captcha, loading: captchaLoading } = useSelector(
    (state) => state.captcha
  );
  const { loading } = useSelector((state) => state.auth);

  // Fetch CAPTCHA on mount
  useEffect(() => {
    dispatch(fetchCaptcha());
  }, [dispatch]);

  // Render CAPTCHA on canvas
  useEffect(() => {
    if (!captcha?.question) return;

    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add random noise dots
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(0, 0, 255, ${Math.random()})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 120, Math.random() * 50, 1, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw CAPTCHA text
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#3c00a0";
    ctx.fillText(captcha.question, 10, 35);
  }, [captcha]);

  // Auto-verify user input
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userAnswer || !captcha?.id) return;

      dispatch(verifyCaptcha({ id: captcha.id, userAnswer })).then((result) => {
        if (result.payload?.success) {
          setCaptchaStatus("CAPTCHA verified ✅");
          setCaptchaColor("green");
          setCaptchaVerified(true);
        } else {
          setCaptchaStatus("Wrong answer ❌");
          setCaptchaColor("red");
          setCaptchaVerified(false);
        }
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [userAnswer, captcha?.id, dispatch]);

  // Handle login
  const handleLogin = async () => {
    if (!captchaVerified) return;

    const role = localStorage.getItem("selected_role");
    const ROLE_IDS = {
      "super-admin": 1,
      "ministry-admin": 2,
      "o-admin": 3,
      "ou-admin": 4,
    };

    const roles_id = role ? ROLE_IDS[role.toLowerCase()] : undefined;

    const result = await dispatch(loginAdmin({ username, password, roles_id }));

    if (loginAdmin.fulfilled.match(result)) {
      const user = result.payload.user;

      localStorage.setItem("token", result.payload.token);
      // localStorage.setItem("roleid", user.roleId);
      localStorage.setItem("role", user.roles);
      localStorage.setItem("username", user.username);
      localStorage.setItem("AllRoles", user.roles);
      localStorage.setItem("last_logged_in_role", user.roles);
      localStorage.removeItem("selected_role");

      navigate("/Dashboard");
    } else {
      dispatch(fetchCaptcha());
      setUserAnswer("");
      setCaptchaStatus("Wrong credentials");
      setCaptchaColor("red");
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-screen-sm mt-8 p-6 bg-white border border-[#168943] shadow-2xl rounded-lg text-center space-y-4">
        <div
          style={{ border: "1px solid", padding: "5%", borderRadius: "10px" }}
        >
          <div style={{ textAlign: "-webkit-center" }}>
            <img src="assets/images/sandes_logo.png" width="15%" alt="Logo" />
          </div>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sandes Authentication Admin Login
          </Typography>

          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          {/* CAPTCHA SECTION */}
          <div className="my-4">
            <div className="flex items-center gap-2 w-full">
              {/* CAPTCHA Canvas */}
              <canvas
                id="captchaCanvas"
                width="120"
                height="50"
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "5px",
                }}
              ></canvas>

              {/* USER ANSWER FIELD */}
              <TextField
                label="Your Answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                fullWidth
              />

              {/* REFRESH CAPTCHA BUTTON */}
              <Button
                onClick={() => {
                  dispatch(fetchCaptcha());
                  setUserAnswer("");
                  setCaptchaVerified(false);
                  setCaptchaStatus("");
                  setCaptchaColor("");
                }}
              >
                ⟳
              </Button>
            </div>

            {/* CAPTCHA STATUS */}
            {captchaStatus && (
              <div
                style={{
                  color: captchaColor,
                  marginTop: "4px",
                  textAlign: "left",
                }}
              >
                {captchaStatus}
              </div>
            )}
          </div>

          <Button
            onClick={handleLogin}
            disabled={!captchaVerified || loading || captchaLoading}
            className="w-full sm:w-auto bg-[#003566] text-white font-semibold"
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
