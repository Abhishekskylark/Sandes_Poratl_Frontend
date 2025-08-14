import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UAParser } from "ua-parser-js";
import axios from "axios";

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

/* ---------------------------- Login Admin ---------------------------- */
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

/* ---------------------------- Fetch Captcha  ---------------------------- */

// Async thunk to fetch Captcha
export const fetchCaptcha = createAsyncThunk(
  "captcha/fetchCaptcha",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/captcha");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch captcha");
    }
  }
);

const captchaSlice = createSlice({
  name: "captcha",
  initialState: {
    captcha: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaptcha.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCaptcha.fulfilled, (state, action) => {
        state.loading = false;
        state.captcha = action.payload;
      })
      .addCase(fetchCaptcha.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Captcha Varify  ---------------------------- */

// Async thunk to fetch CaptchaVarify
export const verifyCaptcha = createAsyncThunk(
  "captcha/verify",
  async ({ id, userAnswer }) => {
    const response = await axios.post("http://localhost:8000/captcha/verify", {
      id,
      userAnswer,
    });
    return response.data;
  }
);

const verifyCaptchaSlice = createSlice({
  name: "verifyCaptcha",
  initialState: {
    verified: false,
  },
  reducers: {
    setVerifiedFalse: (state) => {
      state.verified = false;
    },
    setVerifiedTrue: (state) => {
      state.verified = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyCaptcha.fulfilled, (state, action) => {
      state.verified = action.payload.success;
    });
  },
});

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

/* ---------------------------- Fetch Dashboard  ---------------------------- */

// Async thunk to fetch dashboard
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

/* ---------------------------- Fetch Statistics  ---------------------------- */

// Async thunk to fetch Statistics
export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/stats");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Statistics");
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    statistics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Registration Graph  ---------------------------- */

// Async thunk to fetch Registration Graph
export const fetchRegistrationGraph = createAsyncThunk(
  "registrationGraph/fetchRegistrationGraph",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/registrationgraph");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Registration Graph");
    }
  }
);

const registrationGraphSlice = createSlice({
  name: "registrationGraph",
  initialState: {
    registrationGraph: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrationGraph.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistrationGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationGraph = action.payload;
      })
      .addCase(fetchRegistrationGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch User Graph  ---------------------------- */

// Async thunk to fetch User Graph
export const fetchUserGraph = createAsyncThunk(
  "userGraph/fetchUserGraph",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/userGraph");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch User Graph");
    }
  }
);

const userGraphSlice = createSlice({
  name: "userGraph",
  initialState: {
    userGraph: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGraph.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.userGraph = action.payload;
      })
      .addCase(fetchUserGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Message Graph  ---------------------------- */

// Async thunk to fetch Message Graph
export const fetchMessageGraph = createAsyncThunk(
  "messageGraph/fetchMessageGraph",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/messageGraph");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Message Graph");
    }
  }
);

const messageGraphSlice = createSlice({
  name: "messageGraph",
  initialState: {
    messageGraph: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageGraph.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessageGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.messageGraph = action.payload;
      })
      .addCase(fetchMessageGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Active User Graph  ---------------------------- */

// Async thunk to fetch Active User Graph
export const fetchActiveUserGraph = createAsyncThunk(
  "activeUserGraph/fetchActiveUserGraph",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/activeUserGroup");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Active User Graph");
    }
  }
);

const activeUserGraphSlice = createSlice({
  name: "activeUserGraph",
  initialState: {
    activeUserGraph: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveUserGraph.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveUserGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.activeUserGraph = action.payload;
      })
      .addCase(fetchActiveUserGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Users  ---------------------------- */

// Async thunk to fetch Users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Registration  ---------------------------- */

// Async thunk to fetch Registration
export const fetchRegistration = createAsyncThunk(
  "registration/fetchRegistration",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/registration_activity");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Registration");
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    registration: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registration = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Message Count  ---------------------------- */

// Async thunk to fetch Message Count
export const fetchMessageCount = createAsyncThunk(
  "messageCount/fetchMessageCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/app_message_activity");
      console.log("response.data", response.data);
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Message Count");
    }
  }
);

const messageCountSlice = createSlice({
  name: "messageCount",
  initialState: {
    messageCount: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessageCount.fulfilled, (state, action) => {
        state.loading = false;
        state.messageCount = action.payload;
      })
      .addCase(fetchMessageCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Employees  ---------------------------- */

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

// Async thunk to Update Organization
export const updateOrganization = createAsyncThunk(
  'organization/updateOrganization',
  async ({ formData, rowId }, thunkAPI) => {
    try {
      const apiData = {
        ...rowId,
        organization_code: formData.organizationCode || rowId.organization_code,
        organization_type_id: formData.organizationType || rowId.organization_type_id,
        o_name: formData.organizationName || rowId.o_name,
        is_o_visibility: formData.orgVisibility,
        is_public_visibility: formData.publicVisibility,
        vhost_id: formData.vhost_id || rowId.vhost_id,
      };


      const response = await axios.put(
        `http://localhost:8000/organization/${formData.gu_id}`,
        apiData
      );
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

/* ---------------------------- Delete Organization  ---------------------------- */

// Async thunk to Delete Organization
export const deleteOrganization = createAsyncThunk(
  'organization/deleteOrganization',
  async (gu_id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8000/organization/${gu_id}`);
      console.log("response", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
    }
  }
);

const deleteOrganizationSlice = createSlice({
  name: 'deleteOrganization',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearDeleteStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Organization deleted successfully';
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Delete failed';
      });
  },
});

/* ---------------------------- Fetch Organization Unit  ---------------------------- */

// Async thunk to fetch Organization Unit
export const fetchOrganizationUnit = createAsyncThunk(
  "organizationUnit/fetchOrganizationUnit",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/Organization_Unit");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Organization Unit");
    }
  }
);

const organizationUnitSlice = createSlice({
  name: "organizationUnit",
  initialState: {
    organizationUnit: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationUnit = action.payload;
      })
      .addCase(fetchOrganizationUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- CREATE Organization Unit  ---------------------------- */

// 🔹 // Async thunk to CREATE Organization Unit
export const createOrganizationUnit = createAsyncThunk(
  'organizationUnit/createOrganizationUnit',
  async (formData, thunkAPI) => {
    try {
      const apiData = {
        parent_ou: formData.Parent_OU || '',
        ou_id: formData.OU_ID || '',
        ou_name: formData.OU_Name || '',
        ou_type: formData.OU_Type || '',
        organization_id: formData.organization_id || '',
        state_id: formData.State || '',
        district_id: formData.District || '',
        ou_address: formData.OU_Address || '',
        ou_code: formData.OU_Code || '',
        pin_code: formData.Pin_Code || '',
        landline: formData.Landline || '',
        website: formData.Website || '',
        // gu_id optional: backend khud generate karega
      };

      const response = await axios.post(
        `http://localhost:8000/organization_unit`,
        apiData
      );
      return response.data;
    } catch (error) {
      console.error("Create API error:", error?.response || error);
      return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
    }
  }
);

const createorganizationUnitSlice = createSlice({
  name: 'organizationUnit',
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
      // create
      .addCase(createOrganizationUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganizationUnit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrganizationUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update
      .addCase(updateOrganizationUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationUnit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrganizationUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Update Organization Unit  ---------------------------- */

export const updateOrganizationUnit = createAsyncThunk(
  'organizationUnit/updateOrganizationUnit',
  async ({ formData, rowId }, thunkAPI) => {
    try {
      const apiData = {
        ...rowId,
        parent_ou: formData.Parent_OU ?? rowId.parent_ou,
        ou_id: formData.OU_ID ?? rowId.ou_id,
        ou_name: formData.OU_Name ?? rowId.ou_name,
        ou_type: formData.OU_Type ?? rowId.ou_type,
        organization_id: formData.Organisation ?? rowId.organization_id,
        state_id: formData.State ?? rowId.state_id,
        district_id: formData.District ?? rowId.district_id,
        ou_address: formData.OU_Address ?? rowId.ou_address,
        ou_code: formData.OU_Code ?? rowId.ou_code,
        pin_code: formData.Pin_Code ?? rowId.pin_code,
        landline: formData.Landline ?? rowId.landline,
        website: formData.Website ?? rowId.website,
      };

      const response = await axios.put(
        `http://localhost:8000/organization_unit/${formData.gu_id}`,
        apiData
      );
      return response.data;
    } catch (error) {
      console.error("Update API error:", error?.response || error); // 🔹 real error
      return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
    }
  }
);


const UpdateorganizationUnitSlice = createSlice({
  name: 'organizationUnit',
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
      .addCase(updateOrganizationUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationUnit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrganizationUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Delete Organization Unit  ---------------------------- */

// Async thunk to Delete Organization Unit
export const deleteOrganizationUnit = createAsyncThunk(
  'organizationUnit/deleteOrganizationUnit',
  async (gu_id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8000/organization_unit/${gu_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "An unknown error occurred");
    }
  }
);

const deleteOrganizationUnitSlice = createSlice({
  name: 'deleteOrganizationUnit',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearDeleteStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrganizationUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteOrganizationUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Organization deleted successfully';
      })
      .addCase(deleteOrganizationUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Delete failed';
      });
  },
});


/* ---------------------------- Fetch Masters States  ---------------------------- */

// Async thunk to fetch Masters States
export const fetchMastersStates = createAsyncThunk(
  "mastersStates/fetchMastersStates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/masters_states");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Masters States");
    }
  }
);

const mastersStatesSlice = createSlice({
  name: "mastersStates",
  initialState: {
    mastersStates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMastersStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMastersStates.fulfilled, (state, action) => {
        state.loading = false;
        state.mastersStates = action.payload;
      })
      .addCase(fetchMastersStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch Masters Districts  ---------------------------- */

// Async thunk to fetch Masters Districts

export const fetchMastersDistricts = createAsyncThunk(
  "mastersDistricts/fetchMastersDistricts",
  async (state_code, { rejectWithValue }) => {
    try {
      let url = "http://localhost:8000/masters_districts";
      if (state_code) {
        url += `?state_id=${state_code}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Masters Districts");
    }
  }
);



// const mastersDistrictsSlice = createSlice({
//   name: "mastersDistricts",
//   initialState: {
//     mastersDistricts: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMastersDistricts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMastersDistricts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.mastersDistricts = action.payload;
//       })
//       .addCase(fetchMastersDistricts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

const mastersDistrictsSlice = createSlice({
  name: "mastersDistricts",
  initialState: {
    mastersDistricts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMastersDistricts.pending, (state) => {
        state.loading = true;
        state.mastersDistricts = []; // 🔹 Purana data clear
      })
      .addCase(fetchMastersDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.mastersDistricts = action.payload;
      })
      .addCase(fetchMastersDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------------------------- Fetch OrganizationType  ---------------------------- */

// Async thunk to fetch OrganizationType
export const fetchOrganizationType = createAsyncThunk(
  "organizationType/fetchOrganizationType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/organization_type");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch OrganizationType");
    }
  }
);

const organizationTypeSlice = createSlice({
  name: "organizationType",
  initialState: {
    organizationType: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationType.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationType = action.payload;
      })
      .addCase(fetchOrganizationType.rejected, (state, action) => {
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

/* ---------------------------- Fetch Ministry  ---------------------------- */

// Async thunk to fetch Ministry
export const fetchMinistry = createAsyncThunk(
  "ministry/fetchMinistry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/masters_ministries");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch ministry");
    }
  }
);

const ministrySlice = createSlice({
  name: "ministry",
  initialState: {
    ministry: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinistry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMinistry.fulfilled, (state, action) => {
        state.loading = false;
        state.ministry = action.payload;
      })
      .addCase(fetchMinistry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Import Employee  ---------------------------- */

// Async thunk to fetch Import Employee
export const fetchImportEmployee = createAsyncThunk(
  "importEmployee/fetchImportEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/portal_import_employees_details");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Import Employee");
    }
  }
);

const importEmployeeSlice = createSlice({
  name: "importEmployee",
  initialState: {
    importEmployee: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImportEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.importEmployee = action.payload;
      })
      .addCase(fetchImportEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- Fetch Member  ---------------------------- */

// Async thunk to fetch Member
export const fetchMember = createAsyncThunk(
  "member/fetchMember",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/audit_employee");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Import Employee");
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    member: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


/* ---------------------------- EXPORT REDUCERS ---------------------------- */

export const { logout } = authSlice.actions;
export const { clearModuleError } = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;
export const captchaReducer = captchaSlice.reducer;
export const usersReducer = usersSlice.reducer;
export const statisticsReducer = statisticsSlice.reducer;
export const registrationReducer = registrationSlice.reducer;
export const messageCountReducer = messageCountSlice.reducer;
export const employeeReducer = employeeSlice.reducer;
export const memberReducer = memberSlice.reducer;
export const organizationReducer = organizationSlice.reducer;
export const organizationUnitReducer = organizationUnitSlice.reducer;
export const mastersDistrictsReducer = mastersDistrictsSlice.reducer;
export const mastersStatesReducer = mastersStatesSlice.reducer;
export const designationReducer = designationSlice.reducer;
export const activeUserGraphReducer = activeUserGraphSlice.reducer;
export const userGraphReducer = userGraphSlice.reducer;
export const messageGraphReducer = messageGraphSlice.reducer;
export const registrationGraphReducer = registrationGraphSlice.reducer;
export const importEmployeeReducer = importEmployeeSlice.reducer;
export const groupReducer = groupSlice.reducer;
export const ministryReducer = ministrySlice.reducer;
export const organizationTypeReducer = organizationTypeSlice.reducer;
export const createorganizationUnitReducer = createorganizationUnitSlice.reducer;
export const updateOrganizationReducer = UpdateorganizationSlice.reducer; // camelCase preferred
export const updateOrganizationUnitReducer = UpdateorganizationUnitSlice.reducer;
export const { setVerifiedFalse, setVerifiedTrue } = verifyCaptchaSlice.actions;
export default verifyCaptchaSlice.reducer;
export const authReducer = authSlice.reducer;
export const { setFormData, clearFormData } = UpdateorganizationSlice.actions;
export const { clearDeleteStatus } = deleteOrganizationSlice.actions;
export const deleteOrganizationReducer = deleteOrganizationSlice.reducer;
export const deleteOrganizationUnitReducer = deleteOrganizationUnitSlice.reducer;

