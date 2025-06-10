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
  Brightness4,
  Brightness7,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // 👈 Important for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBuilding, faSitemap, faRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import { useKeycloak } from "../../KeycloakProvider";

const AppBarHeader = ({ handleDrawerToggle, darkMode, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo } = useKeycloak();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

console.log("userInfo",userInfo);


  const isMenuOpen = Boolean(anchorEl);

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

        {/* <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton> */}

        {/* Profile Icon */}
        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>

        {/* Dropdown Menu with routing */}
           {/* {userInfo ? ( */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/LoginAdmin" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faUserTie} className="mr-2" style={{ fontSize: "20px" }} />  Sign in as MINISTRY ADMIN Ministry for POC
          </MenuItem>
          <MenuItem component={Link} to="/LoginAdmin" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faBuilding} className="mr-2" style={{ fontSize: "20px" }} /> Signed in as O ADMIN Organization for POC
          </MenuItem>
          <MenuItem component={Link} to="/LoginAdmin" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faSitemap} className="mr-2" style={{ fontSize: "20px" }} /> Sign in as OU ADMIN OU for POC
          </MenuItem>
          <MenuItem component={Link} to="/LoginAdmin" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faLock} className="mr-2" style={{ fontSize: "20px" }} /> Logged in as 9984261451
          </MenuItem>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" style={{ fontSize: "20px" }} /> Logout
          </MenuItem>
        </Menu>
         {/* ) : (
        <p>Loading user info...</p>
      )} */}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
