// utils/auth.js
import jwtDecode from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.clear();
      return false;
    }
    return true;
  } catch {
    localStorage.clear();
    return false;
  }
};
