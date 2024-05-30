import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Icon } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DomainIcon from "@mui/icons-material/Domain";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import { useGetUpperCardInfo } from "../../../../hooks/api/useHomeApi";

export default function Cards() {
  const UpperCardInfo = useGetUpperCardInfo().data;
  const cardInfo = [
    {
      title: "Total de machine",
      icon: <BroadcastOnHomeIcon />,
      numbre: `${UpperCardInfo?.totalProduit || 0}`,
    },
    {
      title: "Total d'invenatires",
      icon: <InventoryIcon />,
      numbre: `${UpperCardInfo?.totalInventaire || 0}`,
    },
    {
      title: "Total d'entité de travail",
      icon: <DomainIcon />,
      numbre: `${UpperCardInfo?.totalEntiteTravail || 0}`,
    },
    {
      title: "Total des employées",
      icon: <SupervisorAccountRoundedIcon />,
      numbre: `${UpperCardInfo?.totalUtilisateur || 0}`,
    },
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
