import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faBuilding,
  faSitemap,
  faRightToBracket,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { CheckCircle } from "@mui/icons-material";

const ROLE_CONFIG = [
  { key: "ROLE_SUPER_ADMIN", label: "Sign in as Super Admin", icon: faUserTie },
  {
    key: "ROLE_MINISTRY_ADMIN",
    label: "Sign in as Ministry Admin",
    icon: faBuilding,
  },
  { key: "ROLE_O_ADMIN", label: "Sign in as O-Admin", icon: faSitemap },
  { key: "ROLE_OU_ADMIN", label: "Sign in as OU-Admin", icon: faSitemap },
];

const AppBarHeader = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const { userInfo } = useKeycloak();

  const username = localStorage.getItem("username");
  const loginRole = localStorage.getItem("role");
  const AllRoles = JSON.parse(localStorage.getItem("AllRoles"));
  const isMenuOpen = Boolean(anchorEl);

  // convert array → object with index
  const rolesObj = AllRoles.reduce((acc, role, index) => {
    acc[index] = role;
    return acc;
  }, {});

  // final JSON
  const formattedData = { roles: rolesObj };

  console.log("formattedData", formattedData);

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

  const rolesArr = React.useMemo(() => {
    const r = formattedData?.roles;
    if (!r) return [];
    if (Array.isArray(r)) return r; // already array
    if (typeof r === "object") return Object.values(r); // object -> array
    if (typeof r === "string") return [r]; // single string
    return [];
  }, [formattedData]);

  const hasRole = (role) => rolesArr.includes(role);

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

        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 2, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>

        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {/* {formattedData?.roles[1] === "ROLE_SUPER_ADMIN" ? (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("super-admin")}
              sx={
                loginRole === "ROLE_SUPER_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_SUPER_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faUserTie}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as Super Admin
            </MenuItem>
          ) : (
            <></>
          )}
          {formattedData?.roles[1] === "ROLE_MINISTRY_ADMIN" ? (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_MINISTRY_ADMIN")}
              sx={
                loginRole === "ROLE_MINISTRY_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_MINISTRY_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as Ministry Admin
            </MenuItem>
          ) : (
            <></>
          )}
          {formattedData?.roles[1] === "ROLE_O_ADMIN" ? (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_O_ADMIN")}
              sx={
                loginRole === "ROLE_O_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_O_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faSitemap}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as O-Admin
            </MenuItem>
          ) : (
            <></>
          )}
          {formattedData?.roles[1] === "ROLE_OU_ADMIN" ? (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_OU_ADMIN")}
              sx={
                loginRole === "ROLE_OU_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_OU_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faSitemap}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as OU-Admin
            </MenuItem>
          ) : (
            <></>
          )} */}

          {/* {formattedData?.roles?.includes("ROLE_SUPER_ADMIN") && (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_SUPER_ADMIN")}
              sx={
                loginRole === "ROLE_SUPER_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_SUPER_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faUserTie}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as Super Admin
            </MenuItem>
          )}

          {formattedData?.roles?.includes("ROLE_MINISTRY_ADMIN") && (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_MINISTRY_ADMIN")}
              sx={
                loginRole === "ROLE_MINISTRY_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_MINISTRY_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as Ministry Admin
            </MenuItem>
          )}

          {formattedData?.roles?.includes("ROLE_O_ADMIN") && (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_O_ADMIN")}
              sx={
                loginRole === "ROLE_O_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_O_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faSitemap}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as O-Admin
            </MenuItem>
          )}

          {formattedData?.roles?.includes("ROLE_OU_ADMIN") && (
            <MenuItem
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick("ROLE_OU_ADMIN")}
              sx={
                loginRole === "ROLE_OU_ADMIN"
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === "ROLE_OU_ADMIN" && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={faSitemap}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Sign in as OU-Admin
            </MenuItem>
          )} */}

          {ROLE_CONFIG.filter((r) => hasRole(r.key)).map((r) => (
            <MenuItem
              key={r.key}
              component={Link}
              to="/LoginAdmin"
              onClick={() => handleRoleClick(r.key)} // <-- consistent key pass karo
              sx={
                loginRole === r.key
                  ? { color: "green", fontWeight: "bold" }
                  : {}
              }
            >
              {loginRole === r.key && (
                <CheckCircle sx={{ color: "green", fontSize: 20, mr: 1 }} />
              )}
              <FontAwesomeIcon
                icon={r.icon}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              {r.label}
            </MenuItem>
          ))}

          {username && (
            <MenuItem onClick={handleMenuClose}>
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />{" "}
              Logged in as {username}
            </MenuItem>
          )}
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="mr-2"
              style={{ fontSize: "20px" }}
            />{" "}
            Logout
          </MenuItem>
        </Menu>

        {/* <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {formattedData?roles.roles.map((item) => {
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
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2"
                style={{ fontSize: "20px" }}
              />
              Logged in as {mobile}
            </MenuItem>
          )}

          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="mr-2"
              style={{ fontSize: "20px" }}
            />
            Logout
          </MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarHeader;
