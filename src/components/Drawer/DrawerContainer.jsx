import { Box, Drawer } from "@mui/material";

export default function DrawerContainer({
  children,
  state,
  handleDrawerClose,
  width,
}) {
  return (
    <Drawer
      className="custome-drawer"
      sx={{
        width: "100%",
        flexShrink: 0,
        //   borderRadius: "22px 0 0 22px",
        "& .MuiDrawer-paper": {
          // resize: "horizontal",
          // direction: "rtl",
          // overflow: "auto",
          width: width || "50%",
          minWidth: "500px",
          boxSizing: "border-box",
          // borderRadius: "22px 0 0 22px",
          // boxShadow: "-16px 0px 48px 48px rgba(20,20,20,0.1)",
          background: "rgba(255, 255, 255, 0.85)",

          borderRadius: "16px 0 0 16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
          // "-webkit-backdrop-filter": "blur(38px)",
          backdropFilter: "blur(36px)",
          border: "1px solid rgba(255, 255, 255, 0.87",
          // "backdrop-filter": "blur(10px)",
        },
        //   "  &.MuiDrawer-paper .MuiModal-backdrop  ": {
        //     backgroundColor: "#fff !important",
        //   },
      }}
      variant="temporary"
      anchor="right"
      open={state}
      onClose={handleDrawerClose}
    >
      <Box
        sx={{
          // direction: "ltr",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
}
