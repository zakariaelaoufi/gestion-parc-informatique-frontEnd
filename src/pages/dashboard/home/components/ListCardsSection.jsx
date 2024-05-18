import React from "react";
import { Box } from "@mui/material";
import Cards from "./Cards";

export default function ListCardsSection() {
  return (
    <>
      <Box sx={{ marginTop: "48px" }}>
        <Cards />
      </Box>
    </>
  );
}
