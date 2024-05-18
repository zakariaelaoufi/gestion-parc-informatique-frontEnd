import { useState } from "react";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function useUploadDataXlsx() {
  const [excelData, setExcelData] = useState(null);

  const handleFileRead = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    try {
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setExcelData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      setExcelData([]);
    } finally {
      file = null;
      reader = null;
    }
  };

  const UploadButton = (sx = {}, btnNom) => (
    <>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<FileUploadRoundedIcon />}
        color="secondary"
        sx={{ ...sx }}
      >
        {btnNom}
        <VisuallyHiddenInput type="file" onChange={handleFileRead} />
      </Button>
    </>
  );
  return { dataExcel: excelData, UploadButton };
}
