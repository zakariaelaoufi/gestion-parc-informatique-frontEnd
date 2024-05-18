import { Box, Button, Grid, Typography } from "@mui/material";
import Drawer from "../../../../components/Drawer/Drawer";
import TabRender from "../../../../components/Tab/TabRender";
import ComingSoon from "../../../../components/Utils/ComingSoon";
import BlockInfo from "../../../../components/Utils/BlockInfo";
// import TableArticleAttachment from "./TableArticleAttachment";
import {
  useCreateOperationAttachment,
  useGetAttachmentById,
} from "../../../../hooks/api/useAttachmentApi";
import DetailMarche from "../../marche/components/DetailMarche";
import Permission from "../../../../components/Utils/permission";
import { operationAttachement, user_role } from "../../../../global";
import { useSelector } from "react-redux";
// import TableOperationAttachment from "./TableOperationAttachment";
// import ActionOperation from "./ActionOperation";
// import Decompte from "../Decompte";
// import PrintDecompteProvisoire from "./PrintDecompteProvisoire";
import { useGetSupplierById } from "../../../../hooks/api/useSupplierApi";
import TableRIB from "./TableRIB";
import TableMarcheBySupplier from "./TableMarcheBySupplier";
import TableAttachmentBySupplier from "./TableAttachmentBySupplier";

export default function DetailSupplier({ idSupplier }) {
  const data = useGetSupplierById({ id: idSupplier })?.data;
  console.log(data);
  if (!idSupplier || !data) return <></>;
  // if (true) return <>{id}</>;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <BlockInfo
            title={`${data?.name}`}
            infoList={[
              `ICE : ${data?.ice}`,
              `identifyFiscal : ${data?.identifyFiscal}`,
              `numberCNSS : ${data?.numberCNSS}`,
              `patent  : ${data?.patent}`,
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <BlockInfo
            // title={"Contact"}
            infoList={[
              // `name : ${data?.name}`,
              `telephone  : ${data?.telephone}`,
              `fax  : ${data?.fax}`,
              `address  : ${data?.address}`,
            ]}
          />
        </Grid>
      </Grid>

      <Box>
        <TabRender
          tabList={[
            {
              title: "RIBs",
              component: <TableRIB data={data.ribs} />,
            },
            {
              title: "Marchés",
              component: <TableMarcheBySupplier idSupplier={data.id} />,
            },
            {
              title: "Attachements",
              component: <TableAttachmentBySupplier idSupplier={data.id} />,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
