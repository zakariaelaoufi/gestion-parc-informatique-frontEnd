import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import SideBarDashboard from "./sideBar/SideBarDashboard";
import HeaderDashboard from "./HeaderDashboard";
import { useState } from "react";
import { motion } from "framer-motion";
export default function DashboardLayout({ children }) {
  const [sideBarState, setSideBarState] = useState(true);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        borderLeftStyle: "solid",
        borderLeftColor: "secondary.main",
        borderLeftWidth: "6px ",
        backgroundColor: "background.main",
      }}
    >
      {
        // sideBarState &&
        <Box
          component={motion.div}
          // initial={{ opacity: 0.7, x: -82 }}
          animate={{
            opacity: sideBarState ? 1 : 0,
            x: sideBarState ? 0 : -80,
          }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          sx={{
            flex: 1,
            height: "100vh",
            overflowY: "auto",
            minWidth: "350px",
            backgroundColor: "common.white",
            boxShadow: " 4px 0px 57px 0px rgba(55,55,55,0.06)",
            pb: 2.5,
            display: sideBarState ? "block" : "none",
          }}
        >
          <SideBarDashboard />
        </Box>
      }

      <Box
        sx={{
          flex: 4,
          height: "100vh",
          overflowY: "auto",
          // backgroundColor: "background.main",
        }}
      >
        <>
          <HeaderDashboard setSideBarState={setSideBarState} />
        </>

        <Box sx={{ mx: "3.5%" }}>{children}</Box>
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
