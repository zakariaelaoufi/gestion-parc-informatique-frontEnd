import { Box, Grid, Typography } from "@mui/material";
import Barcode from "react-barcode";

export default function BarCodeINVCategorie({
  data = [],
  typeBarcode = "CODE128",
}) {
  if (data.length === 0) return <></>;
  return (
    <Box>
      <Grid container spacing={1} sx={{ textAlign: "center" }}>
        {data?.map((item, index) => (
          <Grid item md={4} key={index}>
            <Box
              key={index}
              sx={{
                my: 4,
                textAlign: "center",
                mx: "auto",
                p: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                bgcolor: "background.paper",
                width: "auto",
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold" }}
              >
                RADEEF
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", mt: -1, mb: 1.5 }}
              >
                INV {new Date().getDate()}/{new Date().getMonth() + 1}/
                {new Date().getFullYear()}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold" }}
              >
                {item?.hostname}
              </Typography>
              <Barcode
                value={item?.numeroSerie}
                height={50}
                format={typeBarcode}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
