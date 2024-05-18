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
        width={"50%"}
        ref={ref}
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
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
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
          {data?.hostname}
        </Typography>
        <Barcode value={data?.numeroSerie} height={50} format={typeBarcode} />
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
        // pageStyle={{
        //   size: { width: "30mm", height: "20mm" },
        // }}
      />
    </Box>
  );
}
