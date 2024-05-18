// import axios from "axios";
import AttachmentList from "./AttachmentList";
import { Box } from "@mui/material";
import { AttachmentContext, AttachmentContextData } from "./AttachmentContext";
import AttachmentModel from "./AttachmentFunctionsModal";

export default function Index() {
  const data = AttachmentContextData();
  return (
    <AttachmentContext.Provider value={data}>
      <Attachment />
    </AttachmentContext.Provider>
  );
}

function Attachment() {
  return (
    <Box>
      <AttachmentList />
      <AttachmentModel />
    </Box>
  );
}
