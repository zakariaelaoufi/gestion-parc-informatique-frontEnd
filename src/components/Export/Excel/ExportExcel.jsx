import { Box } from "@mui/material";

export default function ExportExcel({ data, children }) {
  const handleClick = () => {
    console.log(data);
  };

  return <Box onClick={handleClick}>{children}</Box>;
}
