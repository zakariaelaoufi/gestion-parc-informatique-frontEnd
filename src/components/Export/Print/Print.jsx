import { Button, IconButton } from "@mui/material";
import { useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Print({
  children,
  btnName,
  onPrint = null,
  btnIcon = null,
  ...other
}) {
  const componentRef = useRef();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, []);
  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "documment",
  });

  return (
    <>
      {btnName ? (
        <Button
          // variant={btnVar || "contained"}
          startIcon={btnIcon}
          onClick={() => {
            handlePrint();
            onPrint && onPrint();
          }}
          {...other}
          sx={{ my: 2, px: 3, py: 1 }}
          // disabled={disabled}
        >
          {btnName}
        </Button>
      ) : btnIcon ? (
        <IconButton
          variant="outlined"
          // color={btnColor || "primary"}
          // sx={{ mx: 1 }}
          onClick={() => {
            handlePrint();
            onPrint && onPrint();
          }}
          {...other}
        >
          {btnIcon}
        </IconButton>
      ) : (
        <></>
      )}
      <div
        style={{
          // padding: "42px 32px",
          display: "none",
        }}
      >
        <div
          ref={componentRef}
          style={
            {
              // border : "1px solid #57575722" ,
              // padding: "42px 32px",
            }
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
