import { Box } from "@mui/material";

export default function ComingSoon({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        minHeight: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight:"bold" , 
        fontSize:22, 
        opacity : 0.75 , 
        textTransform:"capitalize"
      }}
    >
      {children}
    </Box>
  );
}
