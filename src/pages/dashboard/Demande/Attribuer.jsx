import React from "react";
import TabRender from "../../../components/Tab/TabRender";
import { Box, Typography } from "@mui/material";
import Demander from "./Demander";
import Attacher from "./Attacher";

export default function Attribuer() {
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            my: 3,
            fontWeight: "bold",
            borderLeft: "5px solid ",
            borderLeftColor: "secondary.main",
            px: 1.5,
          }}
        >
          Imprimer Codebar
        </Typography>

        <Box
          sx={{
            width: "100%",
            p: 0,
            borderRadius: 2,
          }}
        >
          <TabRender
            tabList={[
              {
                title: "affecter une machine",
                component: <Demander />,
              },
              {
                title: "attacher une machine",
                component: <Attacher />,
              },
            ]}
          />
          {/* /////// */}
        </Box>
      </Box>
    </>
  );
}
