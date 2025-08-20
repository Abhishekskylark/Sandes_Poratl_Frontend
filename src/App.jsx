import "./App.css";
import Home from "./Pages/HomePage/Home";
import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Dlinks from "./Pages/Dlinks/Dlinks";
import OrganizationUnit from "./Pages/OrganizationUnit/OrganizationUnit";
import Designation from "./Pages/Designation/Designation";
import LoginManagement from "./Pages/LoginManagement/LoginManagement";
import Searchmember from "./Pages/Searchmember/Searchmember";
import GroupManagement from "./Pages/GroupManagement/GroupManagement";
import ImportEmployees from "./Pages/ImportEmployees/ImportEmployees";
import ManageOrganization from "./Pages/ManageOrganization/ManageOrganization";
import UnverifiedMembers from "./Pages/UnverifiedMembers/UnverifiedMembers";
import DailyChat from "./Pages/DailyChat/DailyChat";
import PercapitaStatistics from "./Pages/PercapitaStatistics/PercapitaStatistics";
import GroupAddMemebr from "./Pages/GroupAddMemebr/GroupAddMemebr";
import OrganizationOverview from "./Pages/OrganizationOverview/OrganizationOverview";
import MemberPage from "./Pages/MemberPage/MemberPage";
import EmployeHeatMap from "./Pages/EmployeHeatMap/EmployeHeatMap";
import All_modules from "./Pages/AllModules/All_modules";
import LoginCheck from "./Pages/LoginCheck";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/all-module" element={<All_modules />} />
        <Route path="/PercapitaStatistics" element={<PercapitaStatistics />} />
        <Route path="/DailyChat" element={<DailyChat />} />
        <Route path="/import-employees" element={<ImportEmployees />} />
        <Route path="/GroupAddMemebr" element={<GroupAddMemebr />} />
        <Route path="/groups" element={<GroupManagement />} />
        <Route path="/search-locate-member" element={<Searchmember />} />
        <Route path="/members" element={<LoginManagement />} />
        <Route path="/designations" element={<Designation />} />
        <Route path="/members-to-be-verified" element={<UnverifiedMembers />} />
        <Route path="/MemberPage" element={<MemberPage />} />
        <Route path="/HeatMap" element={<EmployeHeatMap />} />
        <Route path="/organization" element={<ManageOrganization />} />
        <Route path="/organization-units" element={<OrganizationUnit />} />
        <Route path="/OrganizationOverview" element={<OrganizationOverview />} /> 
        <Route path="/Dlinks" element={<Dlinks />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/LoginWeb" element={<Login />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />

    </Router>


  );
}

export default App;
