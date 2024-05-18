import { Box } from "@mui/material";
import { useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTableData from "./template/PrintTableData";

export default function Print({ data, children }) {
  const componentRef = useRef();

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
  });

  return (
    <>
      <div style={{ display: "none" }}>
        <PrintTableData {...{ componentRef, data }} />
      </div>
      {children ? (
        <Box onClick={handlePrint}>{children}</Box>
      ) : (
        <span onClick={handlePrint}>Imprimer</span>
      )}
    </>
  );
}
