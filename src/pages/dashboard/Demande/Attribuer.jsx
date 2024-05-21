import React from "react";
import TabRender from "../../../components/Tab/TabRender";
import { Box, Typography } from "@mui/material";
import Demander from "./Demander";
import Attacher from "./Attacher";
import { useLocation } from "react-router-dom";

export default function Attribuer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const host_name = searchParams.get("host_name");

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
          Attribuer une machine
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
                component: <Demander host_name={host_name} />,
              },
              {
                title: "attacher une machine",
                component: <Attacher host_name={host_name} />,
              },
            ]}
          />
          {/* /////// */}
        </Box>
      </Box>
    </>
  );
}
