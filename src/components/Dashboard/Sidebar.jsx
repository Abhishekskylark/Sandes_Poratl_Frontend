import React, { useState } from "react";
import axios from 'axios';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Dialog,
  Box,
  Select,
  MenuItem,
  useTheme, FormControl, InputLabel, OutlinedInput,
  Input
} from "@mui/material";
import {
  Dashboard,
  ExpandLess,
  ExpandMore,
  Collections as CollectionsIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import Json from "../../Json/Sidebar.json"
import Business from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from 'react-redux';
import { addModule } from '../../redux/authSlice';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Permissions list
const allPermissions = [
  'add_organisation',
  'edit_organisation',
  'organisation_list',
  'delete_organisation',
];

function getStyles(name, selected, theme) {
  return {
    fontWeight:
      selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Sidebar = ({
  isMobile,
  mobileOpen,
  desktopOpen,
  handleDrawerToggle,
  drawerWidth,
  collapsedDrawerWidth,
}) => {
  const [openOrg, setOpenOrg] = useState(false);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [openOrgModule, setOpenOrgModule] = useState(false)
  const { dashboard, loading, error, user, token } = useSelector((state) => state.auth);

  const theme = useTheme();
  // const [moduleName, setModuleName] = useState('');
  // const [selectedPermissions, setSelectedPermissions] = useState([]);
  // const [status, setStatus] = useState('');

  const handlePermissionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPermissions(typeof value === 'string' ? value.split(',') : value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const permissionsObj = {};
  //   allPermissions.forEach(permission => {
  //     permissionsObj[permission] = selectedPermissions.includes(permission) ? 'active' : 'inactive';
  //   });

  //   const payload = {
  //     module_name: moduleName,
  //     permission: permissionsObj,
  //     status: status.toLowerCase(),
  //   };

  //   console.log("payload", payload);


  //   try {
  //     const res = await axios.post('http://localhost:8080/api/v1/modules', payload);
  //     console.log('Module added:', res.data);
  //     setDrawerOpen(false);
  //   } catch (err) {
  //     console.error('Error:', err);
  //   }
  // };


  const dispatch = useDispatch();

  // Instead of local state, use Redux (optional step)
  const [moduleName, setModuleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const permissionsObj = {};
    allPermissions.forEach(permission => {
      permissionsObj[permission] = selectedPermissions.includes(permission) ? 'active' : 'inactive';
    });

    const payload = {
      module_name: moduleName,
      permission: permissionsObj,
      status: status.toLowerCase(),
    };

    dispatch(addModule(payload));
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const handleOrgClick = () => {
    setOpenOrg(!openOrg);
  };
  const handleOrgClickModule = () => {
    setOpenOrgModule(!openOrgModule);
  };

  const handleOrgManagementClick = () => {
    setOrgModalOpen(true);
  };

  const userRole = localStorage.getItem("roleid");

  const userData = Json.find(item => item.id === Number(userRole))




  const drawerContent = (
    <div className="mt-20">
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5 }}
        >
          <ListItemIcon
            sx={{ minWidth: 0, mr: desktopOpen ? 2 : "auto", justifyContent: "center", color: "#fff" }}
          >
            <Dashboard />
          </ListItemIcon>
          {(desktopOpen || isMobile) && <ListItemText sx={{ color: "#fff" }} primary="Dashboard" />}
        </ListItem>

        <ListItem
          button
          onClick={handleOrgClick}
          sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5, cursor: "pointer" }}
        >
          <ListItemIcon
            sx={{ minWidth: 0, mr: desktopOpen ? 2 : "auto", justifyContent: "center", color: "#fff" }}
          >
            <Business />
          </ListItemIcon>
          {(desktopOpen || isMobile) && <ListItemText sx={{ color: "#fff" }} primary="Organization" />}
          {(desktopOpen || isMobile) &&
            (openOrg ? <ExpandLess sx={{ color: "#fff" }} /> : <ExpandMore sx={{ color: "#fff" }} />)}
        </ListItem>

        <Collapse in={openOrg} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {userData.permission.map((item, index) => {
              // console.log("item", item);

              const keyName = Object.keys(item)[0];
              const getIconByKeyName = (keyName) => {
                switch (keyName) {
                  case "Organization":
                    return <ApartmentIcon sx={{ color: "#fff" }} />;
                  case "Organization Units":
                    return <Business sx={{ color: "#fff" }} />;
                  case "Designations":
                    return <AssignmentIndIcon sx={{ color: "#fff" }} />;
                  case "Members":
                    return <PeopleIcon sx={{ color: "#fff" }} />;
                  case "Members To be Verified":
                    return <VerifiedUserIcon sx={{ color: "#fff" }} />;
                  case "Search/Locate Member":
                    return <SearchIcon sx={{ color: "#fff" }} />;
                  case "Groups":
                    return <GroupsIcon sx={{ color: "#fff" }} />;
                  case "Import Employees":
                    return <CloudUploadIcon sx={{ color: "#fff" }} />;
                  default:
                    return <Business sx={{ color: "#fff" }} />;
                }
              };

              const getRouteByKeyName = (keyName) => {
                return "/" + keyName.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
              };

              return (

                <ListItem
                  button
                  component={Link}
                  to={getRouteByKeyName(keyName)}
                  state={{ permissionData: item[keyName] }} // Pass data here
                  sx={{ pl: 4 }}
                  key={index}
                >
                  <ListItemIcon>
                    {getIconByKeyName(keyName)}
                  </ListItemIcon>
                  {(desktopOpen || isMobile) && (
                    <ListItemText primary={keyName} sx={{ color: "#fff" }} />
                  )}
                </ListItem>

              );
            })}

          </List>
        </Collapse>

        {userRole == 1 ?
          <>
            {/* <ListItem
              button
              component={Link}
              to="/sliderMangement"
              sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: desktopOpen ? 2 : "auto", justifyContent: "center", color: "#fff" }}
              >
                <CollectionsIcon />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText sx={{ color: "#fff" }} primary="Slider Management" />}
            </ListItem> */}
            {/* <ListItem
              button
              component={Link}
              to="/usermanagement"
              sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: desktopOpen ? 2 : "auto", justifyContent: "center", color: "#fff" }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText sx={{ color: "#fff" }} primary="User Management" />}
            </ListItem> */}

            <ListItem
              button
              onClick={handleOrgClickModule}
              sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5, cursor: "pointer" }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: desktopOpen ? 2 : "auto", justifyContent: "center", color: "#fff" }}
              >
                <Business />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText sx={{ color: "#fff" }} primary="Module" />}
              {(desktopOpen || isMobile) &&
                (openOrgModule ? <ExpandLess sx={{ color: "#fff" }} /> : <ExpandMore sx={{ color: "#fff" }} />)}
            </ListItem>

            <Collapse in={openOrgModule} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                  sx={{ pl: 4 }}
                >
                  <Business className="mr-8" sx={{ color: "#fff" }} />
                  {(desktopOpen || isMobile) && (
                    <ListItemText primary="Add Modules" sx={{ color: "#fff" }} />
                  )}
                </ListItem>

              </List>
              <List component="div" disablePadding>
                {userData.module.map((item, index) => {
                  // console.log("item", item);

                  const keyName = Object.keys(item)[0];
                  const getIconByKeyName = (keyName) => {
                    switch (keyName) {
                      case "All Modules":
                        return <ApartmentIcon sx={{ color: "#fff" }} />;

                      default:
                        return <Business sx={{ color: "#fff" }} />;
                    }
                  };

                  const getRouteByKeyName = (keyName) => {
                    return "/" + keyName.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
                  };

                  return (

                    <ListItem
                      button
                      component={Link}
                      to={getRouteByKeyName(keyName)}
                      state={{ permissionData: item[keyName] }} // Pass data here
                      sx={{ pl: 4 }}
                      key={index}
                    >
                      <ListItemIcon>
                        {getIconByKeyName(keyName)}
                      </ListItemIcon>
                      {(desktopOpen || isMobile) && (
                        <ListItemText primary={keyName} sx={{ color: "#fff" }} />
                      )}
                    </ListItem>

                  );
                })}

              </List>

            </Collapse>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>

              <div className="modal-content mt-14" style={{ padding: "2%" }}>
                <div className="modal-header">
                  <Typography variant="h5" mb={2} color="#003566" fontWeight="700">
                    Add Module
                  </Typography>
                  <button type="button" className="btn-close" onClick={() => setDrawerOpen(false)}></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Module Name */}
                    <div className="col-md-4 mt-3">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="module-name">Module Name</InputLabel>
                        <OutlinedInput
                          id="module-name"
                          value={moduleName}
                          onChange={(e) => setModuleName(e.target.value)}
                          label="Module Name"
                          required
                        />
                      </FormControl>
                    </div>

                    {/* Permissions Multi-Select (MUI) */}
                    <div className="col-md-4 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="permission-multi-label">Select Permissions</InputLabel>
                        <Select
                          labelId="permission-multi-label"
                          id="permission-multi"
                          multiple
                          value={selectedPermissions}
                          onChange={handlePermissionChange}
                          input={<OutlinedInput label="Select Permissions" />}
                          MenuProps={MenuProps}
                        >
                          {allPermissions.map((perm) => (
                            <MenuItem
                              key={perm}
                              value={perm}
                              style={getStyles(perm, selectedPermissions, theme)}
                            >
                              {perm.replace(/_/g, ' ')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    {/* Status Select (MUI) */}
                    <div className="col-md-4 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          input={<OutlinedInput label="Status" />}
                          required
                          MenuProps={MenuProps}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4">
                    <button type="submit" className="btn btn-success me-2">Add</button>
                    <button type="button" className="btn btn-danger" onClick={() => setDrawerOpen(false)}>Close</button>
                  </div>
                </form>
              </div>


            </Drawer>

          </> :
          <></>
        }

      </List>
    </div>
  );



  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: desktopOpen ? drawerWidth : collapsedDrawerWidth,
            overflowX: "hidden",
            boxSizing: "border-box",
            transition: "width 0.3s",
            backgroundColor: "#003566",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Organization Management Modal */}
      <Dialog open={orgModalOpen} onClose={() => setOrgModalOpen(false)}>
        <Box sx={{ p: 3, minWidth: 500 }}>
          <Typography variant="h5" fontWeight="700" mb={2} color="#003566">
            Update Organization
          </Typography>
          <form>
            <Typography variant="h6" mb={2} textAlign="center" color="#003566">
              Ministry for POC
            </Typography>

            <div className="row">
              <div className="col-md-6 mt-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Organization code"
                  aria-label="default input example"
                />
              </div>
              <div className="col-md-6  mt-3">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Organization Visibility</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-6  mt-3">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Organization type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-6  mt-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Organization name"
                  aria-label="default input example"
                />
              </div>
              <div className="col-md-6  mt-3">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Public Visibility</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <button className="btn btn-success mt-5 mr-3">
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger mt-5"
              onClick={() => setOrgModalOpen(false)}
            >
              Close
            </button>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default Sidebar;
