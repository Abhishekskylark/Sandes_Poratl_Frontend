import { configureStore } from '@reduxjs/toolkit';
import {
  moduleReducer,
  messageCountReducer,
  registrationReducer,
  employeeReducer,
  usersReducer,
  organizationReducer,
  organizationUnitReducer,
  mastersDistrictsReducer,
  mastersStatesReducer,
  designationReducer,
  groupReducer,
  ministryReducer,
  organizationTypeReducer,
  updateOrganizationReducer,
  authReducer,
  deleteOrganizationReducer,
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
    masterDistricts:mastersDistrictsReducer,
    masterStates:mastersStatesReducer,
    designation: designationReducer,
    group: groupReducer,
    ministry: ministryReducer,
    organizationType: organizationTypeReducer,
    updateOrganization: updateOrganizationReducer,
    deleteOrganization:deleteOrganizationReducer,
    auth: authReducer,
  },
});

export default store;
