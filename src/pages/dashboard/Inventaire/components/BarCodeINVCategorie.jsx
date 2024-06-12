import { Box, Grid, Typography } from "@mui/material";
import Barcode from "react-barcode";
import useSelectCategoriewithName from "../../../../hooks/inputs/useSelectCategoriewithName";

export default function BarCodeINVCategorie({
  data = [],
  typeBarcode = "CODE128",
}) {
  const { selectCategorieHTML, Categorie } = useSelectCategoriewithName();
  if (data.length === 0) return <></>;
  return (
    <Box>
      <Grid container spacing={1} sx={{ textAlign: "center" }}>
        {data?.map((item, index) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{ textAlign: "center", mx: "auto" }}
            key={index}
          >
            <Box
              key={index}
              sx={{
                my: 2,
                textAlign: "center",
                mx: "auto",
                p: 1,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "350px",
              }}
            >
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "bold", mb: 0.5 }}
              >
                RADEEF
              </Typography>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "bold", mb: 0.5 }}
              >
                INV {new Date().getDate()}/{new Date().getMonth() + 1}/
                {new Date().getFullYear()}
              </Typography>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {item?.hostname}
              </Typography>
              <Barcode
                value={item?.numeroSerie}
                height={50}
                format={typeBarcode}
                fontSize={15}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
