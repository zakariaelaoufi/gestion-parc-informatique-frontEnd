import { Box, Grid, Typography } from "@mui/material";
import { useGetMarcheById } from "../../../../hooks/api/useMarcheApi";
import Drawer from "../../../../components/Drawer/Drawer";
import { useState } from "react";
import TabRender from "../../../../components/Tab/TabRender";
import TableArticle from "./TableArticle";
import ComingSoon from "../../../../components/Utils/ComingSoon";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TableAttachmentByMarche from "./TableAttachmentByMarche";
import TableDecompteProvisoire from "./TableDecompteProvisoire";
import DetailSupplier from "../../supplier/components/DetailSupplier";
import TableDecompteDefinitif from "./TableDecompteDefinitif";

export default function DetailMarche({ id }) {
  const marcheById = useGetMarcheById({ id });
  const data = marcheById.data;

  if (!id) return <></>;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BlockInfo
            title={"Marché info"}
            infoList={[
              `numberMarche : ${data?.numberMarche}`,
              `montant : ${data?.montant}`,
              `libelle : ${data?.libelle}`,
              `date notification : ${data?.date_notif}`,
              `departement : ${data?.departement?.nameDepartement}`,
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <BlockInfo
            infoList={[
              `name : ${data?.fournisseur?.name}`,
              `ICE : ${data?.fournisseur?.ice}`,
              `telephone : ${data?.fournisseur?.telephone}`,
              `fax : ${data?.fournisseur?.fax}`,
              `address : ${data?.fournisseur?.address}`,
            ]}
          >
            Fournisseur{" "}
            <Drawer
              btnName={"voir plus"}
              title={"Detail Fournisseur"}
              sx={{ fontSize: 11 }}
              width={"48%"}
            >
              <DetailSupplier idSupplier={data?.fournisseur?.id} />
            </Drawer>
          </BlockInfo>
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "details des articles ",
              component: <TableArticle data={data?.detailArticleMarches} />,
            },
            {
              title: "attachements",
              component: <TableAttachmentByMarche idMarche={id} />,
            },
            {
              title: "les decompte provisoire",
              component: <TableDecompteProvisoire idMarche={id} />,
            },
            {
              title: "les decompte definitif",
              component: <TableDecompteDefinitif idMarche={id} />,
            },
          ]}
        />
      </Box>
      {/* <br />
      <br />
      <br />
      <br />
      {JSON.stringify(data)} */}
    </Box>
  );
}

// function BlockInfo({ title, infoList, children }) {
//   return (
//     <Box sx={{ my: 2, width: "100%" }}>
//       <Typography
//         variant="h6"
//         component="h6"
//         sx={{
//           width: "100%",
//           fontWeight: "bold",
//           my: 2,
//           mb: 2,
//           borderLeft: "4px solid ",
//           borderLeftColor: "primary.main",
//           pl: 2,
//           display: "flex",
//           justifyContent: "start",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         {title ? title : children}
//       </Typography>

//       {infoList?.map((e, i) => (
//         <Typography
//           key={i}
//           variant="body1"
//           sx={{ opacity: 0.92, pl: 2.6, my: 0.5 }}
//         >
//           {e}
//           {/* <b>{e.split(":")[0]} : </b>
//           {e.split(":")[1]} */}
//         </Typography>
//       ))}
//     </Box>
//   );
// }

//  {e.split(":")[0]}:{e.split(":")[1]}
// //-----------
// <Grid key={i} container spacing={1}>
//   <Grid item xs={5}>
//     <Typography key={i} variant="body1">
//       - {e.split(":")[0]}
//     </Typography>
//   </Grid>
//   <Grid item xs={7}>
//     <Typography key={i} variant="body1">
//       : {e.split(":")[1]}
//     </Typography>
//   </Grid>
// </Grid>;
