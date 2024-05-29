import { Box, Button, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import Barcode from "react-barcode";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function BarCodeINV({ data = {}, typeBarcode = "CODE128" }) {
  const ref = useRef();
  return (
    <Box>
      <Box
        sx={{
          my: 4,
          textAlign: "center",
          mx: "auto",
          p: 2,
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
        width={"40%"}
        ref={ref}
      >
        <Typography
          variant="body2"
          component="h3"
          sx={{ fontWeight: "bold", maxWidth: "100%" }}
        >
          RADEEF
        </Typography>
        <Typography
          variant="body2"
          component="h3"
          sx={{ fontWeight: "bold", mt: 0.5, mb: 1.5, maxWidth: "100%" }}
        >
          INV {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear()}
        </Typography>
        <Typography
          variant="body2"
          component="h3"
          sx={{ fontWeight: "bold", maxWidth: "100%" }}
        >
          {data?.hostname}
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}
        >
          <Barcode
            value={data?.numeroSerie}
            height={40}
            format={typeBarcode}
            width={1}
            fontSize={16}
          />
        </Box>
      </Box>
      <ReactToPrint
        trigger={() => (
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ p: 1.5, mt: 2 }}
            endIcon={<PrintIcon />}
          >
            Imprimer
          </Button>
        )}
        content={() => ref.current}
      />
    </Box>
  );
}
