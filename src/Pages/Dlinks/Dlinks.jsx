import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppBarHeader from "@/components/Dashboard/AppBarHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import useResponsiveDrawer from "@/hooks/useResponsiveDrawer";
import Footer from '../../components/Footer/Footer'
import DlinksDash from '../../components/Dashboard/DlinksDash'

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

function Dlinks() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  const {
    desktopOpen,
    mobileOpen,
    isMobile,
    handleDrawerToggle,
  } = useResponsiveDrawer();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBarHeader
            handleDrawerToggle={handleDrawerToggle}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode(!darkMode)}
          />
          <Box component="nav" sx={{ width: { md: desktopOpen ? drawerWidth : collapsedDrawerWidth }, flexShrink: { md: 0 } }}>
            <Sidebar
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              desktopOpen={desktopOpen}
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
              collapsedDrawerWidth={collapsedDrawerWidth}
            />
          </Box>
          <DlinksDash
            drawerWidth={drawerWidth}
            collapsedDrawerWidth={collapsedDrawerWidth}
            desktopOpen={desktopOpen}
          />
        </Box>
        <Footer />
      </ThemeProvider>

    </>
  )
}

export default Dlinks