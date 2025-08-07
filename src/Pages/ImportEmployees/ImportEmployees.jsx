import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppBarHeader from "@/components/Dashboard/AppBarHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import useResponsiveDrawer from "@/hooks/useResponsiveDrawer";
import Footer from '../../components/Footer/Footer'
import ImportEmployeesDash from '../../components/Dashboard/ImportEmployeesDash'

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

function ImportEmployees() {
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
                            <ImportEmployeesDash
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

export default ImportEmployees