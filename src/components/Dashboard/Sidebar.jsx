import React, { useState } from "react";
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
} from "@mui/material";
import {
  Dashboard,
  // Business,
  ExpandLess,
  ExpandMore,
  AccountTree,
  Badge,
  People,
  HowToReg,
  Search,
  Groups,
  CloudUpload,
  Collections as CollectionsIcon,
  ManageAccounts as ManageAccountsIcon
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import Json from "../../Json/Sidebar.json"
import { logout } from "@/redux/authSlice";
import Business from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

  const handleOrgClick = () => {
    setOpenOrg(!openOrg);
  };

  const handleOrgManagementClick = () => {
    setOrgModalOpen(true);
  };
  console.log("JsonJson", Json);

  const userRole = localStorage.getItem("userRole");
  console.log("userRole", userRole);


  const userData = Json.find(item => item.id === Number(userRole))
  console.log("Sidebar_Data", userData);




  const drawerContent = (
    <div className="mt-20">
      <List>
        {/* Dashboard Menu */}
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
          sx={{ justifyContent: desktopOpen ? "initial" : "center", px: 2.5 }}
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
              console.log("item", item);

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
                // <ListItem
                //   button
                //   component={Link}
                //   to={getRouteByKeyName(keyName)}
                //   sx={{ pl: 4 }}
                //   key={index}
                // >
                //   <ListItemIcon>
                //     {getIconByKeyName(keyName)}
                //   </ListItemIcon>
                //   {(desktopOpen || isMobile) && (
                //     <ListItemText primary={keyName} sx={{ color: "#fff" }} />
                //   )}
                // </ListItem>

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
            {/* {userData.permission.map((item, index) => {
              const keyName = Object.keys(item)[0];
              const subPermissions = item[keyName];

              const [openSubMenu, setOpenSubMenu] = useState(null); // Move this state up to manage multiple open states

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

              const formatPermissionName = (perm) => {
                return perm
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase());
              };

              const handleSubMenuToggle = (menuKey) => {
                setOpenSubMenu((prev) => (prev === menuKey ? null : menuKey));
              };

              return (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => handleSubMenuToggle(keyName)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>{getIconByKeyName(keyName)}</ListItemIcon>
                    {(desktopOpen || isMobile) && (
                      <ListItemText primary={keyName} sx={{ color: "#fff" }} />
                    )}
                  </ListItem>

                  <Collapse in={openSubMenu === keyName} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {Object.entries(subPermissions).map(([permKey, status], i) => {
                        if (status !== "active") return null;

                        return (
                          <ListItem key={i} sx={{ pl: 6 }}>
                            <ListItemText
                              primary={formatPermissionName(permKey)}
                              sx={{ color: "#fff" }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })} */}

          </List>
        </Collapse>




        {/* <ListItem button component={Link} to="/ManageOrganization" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Business sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText primary="Organization" sx={{ color: "#fff" }} />}
            </ListItem>

            <ListItem button component={Link} to="/OrganizationUnit" sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccountTree sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && (
                <ListItemText primary="Organization Units" sx={{ color: "#fff" }} />
              )}
            </ListItem>

            <ListItem button component={Link} to="/Designation" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Badge sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText primary="Designations" sx={{ color: "#fff" }} />}
            </ListItem>

            <ListItem button component={Link} to="/LoginManagement" sx={{ pl: 4 }}>
              <ListItemIcon>
                <People sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText primary="Members" sx={{ color: "#fff" }} />}
            </ListItem>

            <ListItem button component={Link} to="/UnverifiedMembers" sx={{ pl: 4 }}>
              <ListItemIcon>
                <HowToReg sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && (
                <ListItemText primary="Members To be Verified" sx={{ color: "#fff" }} />
              )}
            </ListItem>

            <ListItem button component={Link} to="/Searchmember" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Search sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && (
                <ListItemText primary="Search/Locate Member" sx={{ color: "#fff" }} />
              )}
            </ListItem>

            <ListItem button component={Link} to="/GroupManagement" sx={{ pl: 4 }}>
              <ListItemIcon>
                <Groups sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText primary="Groups" sx={{ color: "#fff" }} />}
            </ListItem>

            <ListItem button component={Link} to="/ImportEmployees" sx={{ pl: 4 }}>
              <ListItemIcon>
                <CloudUpload sx={{ color: "#fff" }} />
              </ListItemIcon>
              {(desktopOpen || isMobile) && (
                <ListItemText primary="Import Employees" sx={{ color: "#fff" }} />
              )}
            </ListItem> */}

        {userRole == 1 ?
          <>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
          </> :
          <></>
        }


        {/* Organization Dropdown */}

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
