import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Icon } from "@mui/material";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

export default function Cards() {
  const cardInfo = [
    // {
    //   title: "Les nombres des attachements",
    //   icon: <AttachEmailRoundedIcon />,
    //   numbre: "5000",
    // },
    // {
    //   title: "Les nombres des marchés",
    //   icon: <StoreRoundedIcon />,
    //   numbre: "2500",
    // },
    // {
    //   title: "Les nombres des fournisseurs",
    //   icon: <SupervisorAccountRoundedIcon />,
    //   numbre: "120",
    // },
    // {
    //   title: "Total payment en  Dhs",
    //   icon: <PaidRoundedIcon />,
    //   numbre: "100.254,00",
    // },
  ];
  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={2} justifyContent="center">
        {cardInfo.map((e, i) => (
          <Grid key={i} item xs={3}>
            <Card
              sx={{
                maxWidth: 345,
                p: 2,
                boxShadow: " 0 1px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    justifyContent: "start",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    // gap: 2,
                    pb: 1,
                  }}
                >
                  <Icon
                    sx={{
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      " & svg": {
                        fontSize: "32px",
                      },
                    }}
                    color="secondary"
                  >
                    {e.icon}
                  </Icon>
                  {/* {e.icon} */}
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{
                      fontWeight: "700",
                      fontSize: "36px",
                      color: "primary.main",
                      marginBottom: "0px",
                    }}
                  >
                    {e.numbre}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {e.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
