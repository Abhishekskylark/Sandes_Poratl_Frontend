import { configureStore } from '@reduxjs/toolkit';
import {
  moduleReducer,
  messageCountReducer,
  registrationReducer,
  employeeReducer,
  usersReducer,
  organizationReducer,
  organizationUnitReducer,
  designationReducer,
  groupReducer,
  ministryReducer,
  organizationTypeReducer,
  updateOrganizationReducer,
  authReducer,
} from './authSlice';

const store = configureStore({
  reducer: {
    module: moduleReducer,
    employee: employeeReducer,
    messageCount:messageCountReducer,
    registration:registrationReducer,
    users: usersReducer,
    organization: organizationReducer,
    organizationUnit: organizationUnitReducer,
    designation: designationReducer,
    group: groupReducer,
    ministry: ministryReducer,
    organizationType: organizationTypeReducer,
    updateOrganization: updateOrganizationReducer,
    auth: authReducer,
  },
});

export default store;
