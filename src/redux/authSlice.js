//   import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { UAParser } from "ua-parser-js";

// // Fetch IP
// const getIP = async () => {
//   try {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const data = await res.json();
//     return data.ip;
//   } catch {
//     return "unknown";
//   }
// };

// // 🔐 Login Thunk
// export const loginAdmin = createAsyncThunk(
//   "auth/loginAdmin",
//   async ({ mobile, password }, { rejectWithValue }) => {
//     try {
//       const parser = new UAParser();
//       const uaData = parser.getResult();
//       const browser = uaData.browser.name;
//       const version = uaData.browser.version;
//       const ip = await getIP();

//       // Step 1: Login to Keycloak
//       const response = await fetch(
//         "http://localhost:8080/realms/sandes_new/protocol/openid-connect/token",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: new URLSearchParams({
//             grant_type: "password",
//             client_id: "sandes_new",
//             client_secret: "P34vdWuXfQU8xzXTtwThhtRcimXY2n1N",
//             username: mobile,
//             password: password,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) return rejectWithValue(data.error_description || "Invalid credentials");

//       const accessToken = data.access_token;
//       const [part1, part2, part3] = accessToken.split(".");

//       // Store in localStorage securely
//       localStorage.setItem("token1", part1);
//       localStorage.setItem("token2", part2);
//       localStorage.setItem("token3", part3);
//       localStorage.setItem("ip", ip);
//       localStorage.setItem("browser", browser);
//       localStorage.setItem("version", version);

//       // Fetch profile
//       const profileRes = await fetch("http://localhost:5000/api/user-profile", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "X-Client-IP": ip,
//           "X-Client-Browser": browser,
//           "X-Client-Version": version,
//         },
//       });

//       const profileData = await profileRes.json();
//       if (!profileRes.ok) return rejectWithValue(profileData.message || "Failed to fetch profile");

//       return {
//         user: profileData.user,
//         token: accessToken,
//       };
//     } catch (err) {
//       return rejectWithValue("Login failed");
//     }
//   }
// );

// // 🔁 Other example protected thunk
// export const fetchDashboard = createAsyncThunk(
//   "auth/fetchDashboard",
//   async (_, { getState, rejectWithValue }) => {
//     const token = [
//       localStorage.getItem("token1"),
//       localStorage.getItem("token2"),
//       localStorage.getItem("token3"),
//     ].join(".");
//     try {
//       const res = await fetch("http://localhost:5000/api/dashboard", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Client-IP": localStorage.getItem("ip"),
//           "X-Client-Browser": localStorage.getItem("browser"),
//           "X-Client-Version": localStorage.getItem("version"),
//         },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message || "Dashboard fetch failed");
//     }
//   }
// );

// // 🔸 Auth Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loading: false,
//     isAuthenticated: false,
//     user: null,
//     token: null,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       localStorage.clear();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;





// src/redux/combinedSlices.js




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { toast } from "react-toastify";

/* ---------------------------- AUTH SLICE ---------------------------- */

// Get IP
const getIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "unknown";
  }
};

// 🔐 Login Thunk
// export const loginAdmin = createAsyncThunk(
//   "auth/loginAdmin",
//   async ({ mobile, password }, { rejectWithValue }) => {
//     try {
//       const parser = new UAParser();
//       const uaData = parser.getResult();
//       const browser = uaData.browser.name;
//       const version = uaData.browser.version;
//       const ip = await getIP();

//       const response = await fetch(
//         "http://localhost:8080/realms/sandes_new/protocol/openid-connect/token",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: new URLSearchParams({
//             grant_type: "password",
//             client_id: "sandes_new",
//             client_secret: "P34vdWuXfQU8xzXTtwThhtRcimXY2n1N",
//             username: mobile,
//             password: password,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) return rejectWithValue(data.error_description || "Invalid credentials");

//       const accessToken = data.access_token;
//       const [part1, part2, part3] = accessToken.split(".");

//       localStorage.setItem("token1", part1);
//       localStorage.setItem("token2", part2);
//       localStorage.setItem("token3", part3);
//       localStorage.setItem("ip", ip);
//       localStorage.setItem("browser", browser);
//       localStorage.setItem("version", version);

//       const profileRes = await fetch("http://localhost:5000/api/user-profile", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "X-Client-IP": ip,
//           "X-Client-Browser": browser,
//           "X-Client-Version": version,
//         },
//       });

//       const profileData = await profileRes.json();
//       if (!profileRes.ok) return rejectWithValue(profileData.message || "Failed to fetch profile");

//       return {
//         user: profileData.user,
//         token: accessToken,
//       };
//     } catch (err) {
//       return rejectWithValue("Login failed");
//     }
//   }
// );

// 🔐 Login Thunk
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ mobile, password, roles_id }, { rejectWithValue }) => {

    try {
      const parser = new UAParser();
      const uaData = parser.getResult();
      const browser = uaData.browser.name;
      const version = uaData.browser.version;
      const ip = await getIP();

      const response = await fetch(
        "http://localhost:8080/realms/sandes_new/protocol/openid-connect/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "password",
            client_id: "sandes_new",
            client_secret: "P34vdWuXfQU8xzXTtwThhtRcimXY2n1N",
            username: mobile,
            password: password,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error_description || "Invalid credentials");

      const accessToken = data.access_token;
      const [part1, part2, part3] = accessToken.split(".");

      localStorage.setItem("token1", part1);
      localStorage.setItem("token2", part2);
      localStorage.setItem("token3", part3);
      localStorage.setItem("ip", ip);
      localStorage.setItem("browser", browser);
      localStorage.setItem("version", version);

      const profileHeaders = {
        Authorization: `Bearer ${accessToken}`,
        "X-Client-IP": ip,
        "X-Client-Browser": browser,
        "X-Client-Version": version,
      };

      // 🔁 Add roles_id only if passed
      if (roles_id) {
        profileHeaders["x-roles-id"] = roles_id;
      }

      const profileRes = await fetch("http://localhost:5000/api/user-profile", {
        headers: profileHeaders,
      });

      const profileData = await profileRes.json();
      // console.log("profileData", profileData);

      if (!profileRes.ok) return rejectWithValue(profileData.message || "Failed to fetch profile");

      return {
        user: profileData.user,
        token: accessToken,
      };
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

/* ---------------------------- MODULE SLICE ---------------------------- */

export const addModule = createAsyncThunk(
  "modules/addModule",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/modules", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add module");
    }
  }
);

const moduleSlice = createSlice({
  name: "modules",
  initialState: {
    modules: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearModuleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.loading = false;
        state.modules.push(action.payload);
      })
      .addCase(addModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const fetchDashboard = createAsyncThunk(
  "auth/fetchDashboard",
  async (_, { getState, rejectWithValue }) => {
    const token = [
      localStorage.getItem("token1"),
      localStorage.getItem("token2"),
      localStorage.getItem("token3"),
    ].join(".");
    try {
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Client-IP": localStorage.getItem("ip"),
          "X-Client-Browser": localStorage.getItem("browser"),
          "X-Client-Version": localStorage.getItem("version"),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Dashboard fetch failed");
    }
  }
);


export const { clearModuleError } = moduleSlice.actions;


/* ---------------------------- Fetch Employees  ---------------------------- */

// combinedSlices.js

// Async thunk to fetch employees
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch employees");
    }
  }
);

// Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Organization  ---------------------------- */

// Async thunk to fetch Organization
export const fetchOrganization = createAsyncThunk(
  "organization/fetchOrganization",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/organization");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch organization");
    }
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organization: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Update Organization  ---------------------------- */

// export const updateOrganization = createAsyncThunk(
//   'organization/updateOrganization',
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.post('http://localhost:8000/organization/:id', formData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
//     }
//   }
// );

// export const updateOrganization = createAsyncThunk(
//   'organization/updateOrganization',
//   async (formData, thunkAPI , rowId ) => {
//     console.log("formData",formData);

//     try {
//       const id = formData.gu_id; // extract gu_id
//       const response = await axios.post(`http://localhost:8000/organization/${id}`, formData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
//     }
//   }
// );


export const updateOrganization = createAsyncThunk(
  'organization/updateOrganization',
  async ({ formData, rowId }, thunkAPI) => {
    try {
      const apiData = {
        ...rowId,
        organization_code: formData.organizationCode || rowId.organization_code,
        organization_type_id: formData.organizationType || rowId.organization_type_id,
        o_name: formData.organizationName || rowId.o_name,
        is_o_visibility: formData.orgVisibility === 1,
        is_public_visibility: formData.publicVisibility === 1,
        vhost_id: formData.vhost_id || rowId.vhost_id,
      };


      const response = await axios.put(
        `http://localhost:8000/organization/${formData.gu_id}`,
        apiData
      );
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
    }
  }
);


const UpdateorganizationSlice = createSlice({
  name: 'organization',
  initialState: {
    formData: {
      organizationCode: '',
      organizationType: '',
      organizationName: '',
      vhost: '',
      orgVisibility: '',
      publicVisibility: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = {
        organizationCode: '',
        organizationType: '',
        organizationName: '',
        vhost: '',
        orgVisibility: '',
        publicVisibility: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Designation  ---------------------------- */

// Async thunk to fetch Designation
export const fetchDesignation = createAsyncThunk(
  "designation/fetchDesignation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/designation");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch designation");
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState: {
    designation: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designation = action.payload;
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Group  ---------------------------- */

// Async thunk to fetch Group
export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/group");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch group");
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    group: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- EXPORT REDUCERS ---------------------------- */


export const moduleReducer = moduleSlice.reducer;
export const employeeReducer = employeeSlice.reducer;
export const organizationReducer = organizationSlice.reducer;
export const designationReducer = designationSlice.reducer;
export const groupReducer = groupSlice.reducer;
export const updateOrganizationReducer = UpdateorganizationSlice.reducer; // camelCase preferred
export const authReducer = authSlice.reducer;
export const { setFormData, clearFormData } = UpdateorganizationSlice.actions;
