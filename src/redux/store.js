// // src/redux/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import moduleReducer from "./authSlice";
// import employeeReducer from "./authSlice";

// export default configureStore({
//   reducer: {
//     auth: authReducer,
//     modules: moduleReducer,
//     employee: employeeReducer,
//   }
// });




// import { configureStore } from "@reduxjs/toolkit";
// import authReducer, { moduleReducer, employeeReducer,orgnizationReducer, UpdateOrganizationReducer} from "./authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     modules: moduleReducer,
//     employee: employeeReducer, // ✅ Must match useSelector
//     orgnization:orgnizationReducer,
//     UpdateOrganization:UpdateOrganizationReducer
//   },
// });

// export default store;





import { configureStore } from '@reduxjs/toolkit';
import {
  moduleReducer,
  employeeReducer,
  organizationReducer,
  designationReducer,
  groupReducer,
  updateOrganizationReducer,
  authReducer,
} from './authSlice';

const store = configureStore({
  reducer: {
    module: moduleReducer,
    employee: employeeReducer,
    organization: organizationReducer,
    designation:designationReducer,
    group:groupReducer,
    updateOrganization: updateOrganizationReducer,
    auth: authReducer,
  },
});

export default store;
