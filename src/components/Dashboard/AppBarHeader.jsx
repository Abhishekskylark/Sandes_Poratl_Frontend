import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faBuilding,
  faSitemap,
  faRightToBracket,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useKeycloak } from "../../KeycloakProvider";
import { CheckCircle } from "@mui/icons-material";

const AppBarHeader = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useKeycloak();

  const mobile = localStorage.getItem("mobile");
  const loginRole = localStorage.getItem("role");
  const AllRoles = JSON.parse(localStorage.getItem("AllRoles"));
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRoleClick = (selectedRole) => {
    localStorage.setItem("selected_role", selectedRole);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#003566",
      }}
    >
      <Toolbar>
        <div className="logo d-flex mr-7 mt-1 mb-1">
          <img
            src="assets/images/ashok.png"
            alt="logo"
            loading="lazy"
            width="40px"
            style={{ marginRight: "25px", filter: "invert(1)" }}
          />
          <img
            src="assets/images/sandes_logo.png"
            alt="logo"
            loading="lazy"
            width="65px"
          />
        </div>

        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ ml: 2, mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>

        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>

        {/* <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {(AllRoles[0].role === "super-admin") ?
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("super-admin")}
              sx={loginRole === "super-admin" ? { color: "green", fontWeight: "bold" } : {}}
            >
              {loginRole === "super-admin" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon icon={faUserTie} className="mr-2" style={{ fontSize: "20px" }} />
              Sign in as Super Admin
            </MenuItem> :
            <></>}
          {(AllRoles[1].role === "ministry-admin") ?
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ministry-admin")}
              sx={loginRole === "ministry-admin" ? { color: "green", fontWeight: "bold" } : {}}
            >
              {loginRole === "ministry-admin" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon icon={faBuilding} className="mr-2" style={{ fontSize: "20px" }} />
              Sign in as Ministry Admin
            </MenuItem> : <></>}
          {(AllRoles[2].role === "O-Admin") ?
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("O-Admin")}
              sx={loginRole === "O-Admin" ? { color: "green", fontWeight: "bold" } : {}}
            >
              {loginRole === "O-Admin" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon icon={faSitemap} className="mr-2" style={{ fontSize: "20px" }} />
              Sign in as O-Admin
            </MenuItem> : <></>}
          {(AllRoles[3].role === "OU-Admin") ?
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("OU-Admin")}
              sx={loginRole === "OU-Admin" ? { color: "green", fontWeight: "bold" } : {}}
            >
              {loginRole === "OU-Admin" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon icon={faSitemap} className="mr-2" style={{ fontSize: "20px" }} />
              Sign in as OU-Admin
            </MenuItem> : <></>}
          {mobile && (
            <MenuItem onClick={handleMenuClose}>
              <FontAwesomeIcon icon={faLock} className="mr-2" style={{ fontSize: "20px" }} /> Logged in as {mobile}
            </MenuItem>
          )}
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" style={{ fontSize: "20px" }} /> Logout
          </MenuItem>
        </Menu> */}

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {AllRoles.map((item) => {
            const role = item.role.toLowerCase();
            let icon = faUserTie;
            if (role === "ministry-admin") icon = faBuilding;
            else if (role === "o-admin" || role === "ou-admin") icon = faSitemap;

            return (
              <MenuItem
                key={item.roleId}
                component={Link}
                to="/LoginAdmin"
                onClick={() => handleRoleClick(item.role)}
                sx={
                  loginRole === item.role
                    ? { color: "green", fontWeight: "bold" }
                    : {}
                }
              >
                {loginRole === item.role && (
                  <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
                )}
                <FontAwesomeIcon
                  icon={icon}
                  className="mr-2"
                  style={{ fontSize: "20px" }}
                />
                Sign in as {item.role}
              </MenuItem>
            );
          })}

          {mobile && (
            <MenuItem onClick={handleMenuClose}>
              <FontAwesomeIcon icon={faLock} className="mr-2" style={{ fontSize: "20px" }} />
              Logged in as {mobile}
            </MenuItem>
          )}

          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" style={{ fontSize: "20px" }} />
            Logout
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
