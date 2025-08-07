import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const useResponsiveDrawer = () => {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  return { desktopOpen, mobileOpen, isMobile, handleDrawerToggle };
};

export default useResponsiveDrawer;
