// // src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const generateOtp = createAsyncThunk(
//   "auth/generateOtp",
//   async (phone, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/send-otp", { phone });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
//     }
//   }
// );

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ phone, otp }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/verify-otp", { phone, otp });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "OTP verification failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loading: false,
//     error: null,
//     isOtpSent: false,
//     isAuthenticated: false,
//     user: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(generateOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.isOtpSent = true;
//       })
//       .addCase(generateOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(verifyOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔸 Thunk to generate OTP
export const generateOtp = createAsyncThunk(
  "auth/generateOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/send-otp", { phone });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

// 🔸 Thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/verify-otp", { phone, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP verification failed");
    }
  }
);

// 🔸 Thunk to fetch dashboard data after authentication
export const fetchDashboard = createAsyncThunk(
  "auth/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      // Agar auth token chahiye ho to header me bhejna padega
      const res = await axios.get("/api/dashboard");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch dashboard");
    }
  }
);

// 🔸 Initial state of the auth slice
const initialState = {
  loading: false,
  error: null,
  isOtpSent: false,
  isAuthenticated: false,
  user: null,
  dashboard: null, // Dashboard data yahan store hoga
};

// 🔸 Creating the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.dashboard = null; // logout par dashboard bhi clear
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 generateOtp cases
      .addCase(generateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOtp.fulfilled, (state) => {
        state.loading = false;
        state.isOtpSent = true;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 verifyOtp cases
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 fetchDashboard cases
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🔸 Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
