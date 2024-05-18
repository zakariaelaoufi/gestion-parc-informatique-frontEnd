import { Box, Typography } from "@mui/material";

export default function BlockInfo({ title, infoList, children }) {
  return (
    <Box sx={{ my: 2, width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          width: "100%",
          fontWeight: "bold",
          my: 2,
          mb: 2,
          borderLeft: "4px solid ",
          borderLeftColor: "primary.main",
          pl: 2,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
        }}
      >
        {title ? title : children}
      </Typography>

      {infoList?.map((e, i) => (
        <Typography
          key={i}
          variant="body1"
          sx={{ opacity: 0.92, pl: 2.6, my: 0.5 }}
        >
          {e}
          {/* <b>{e.split(":")[0]} : </b>
            {e.split(":")[1]} */}
        </Typography>
      ))}
    </Box>
  );
}
