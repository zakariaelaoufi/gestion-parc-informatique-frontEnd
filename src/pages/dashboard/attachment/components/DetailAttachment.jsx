import { Box, Button, Grid, Typography } from "@mui/material";
import Drawer from "../../../../components/Drawer/Drawer";
import TabRender from "../../../../components/Tab/TabRender";
import ComingSoon from "../../../../components/Utils/ComingSoon";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TableArticleAttachment from "./TableArticleAttachment";
import {
  useCreateOperationAttachment,
  useGetAttachmentById,
} from "../../../../hooks/api/useAttachmentApi";
import DetailMarche from "../../marche/components/DetailMarche";
import Permission from "../../../../components/Utils/permission";
import { operationAttachement, user_role } from "../../../../global";
import { useSelector } from "react-redux";
import TableOperationAttachment from "./TableOperationAttachment";
import ActionOperation from "./ActionOperation";
import Decompte from "../Decompte";
import PrintDecompteProvisoire from "./PrintDecompteProvisoire";

export default function DetailAttachment({ id }) {
  const attachmentById = useGetAttachmentById({ id });
  const data = attachmentById?.data?.attachement;
  const decompteIds = attachmentById?.data?.decompteIds;
  const total = data?.detailArticleAttachements?.reduce(
    (acc, e) => acc + e.qte * e.price_UT,
    0
  );
  console.log("attachmentById --------> ", data);
  // console.log(total);
  const attachementState = data?.operationAttachement[0]?.state || null;
  if (!id) return <></>;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <BlockInfo
            title={"Attachement info"}
            infoList={[
              `numberAttachement : ${data?.numberAttachement}`,
              `date_works_start : ${data?.date_works_start}`,
              `date_works_end : ${data?.date_works_end}`,
              `fournisseur name : ${data?.marche?.fournisseur?.name}`,
              `fournisseur ICE : ${data?.marche?.fournisseur?.ice}`,
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <BlockInfo
            infoList={[
              `libelle : ${data?.marche?.libelle}`,
              `numberMarche : ${data?.marche?.numberMarche}`,
              `date_notif : ${data?.marche?.date_notif}`,
              `montant : ${data?.marche?.montant}`,
            ]}
          >
            Marché
            <Drawer
              btnName={"voir plus"}
              title={"Detail Marché"}
              sx={{ fontSize: 11 }}
              width={"48%"}
            >
              <DetailMarche id={data?.marche?.id} />
            </Drawer>
          </BlockInfo>
        </Grid>
        {/* <Grid item xs={6}></Grid> */}
        {/* <Grid item xs={12}>
          <BlockInfo infoList={[]}>
            Créer decompte <Decompte />
          </BlockInfo>
        </Grid> */}
      </Grid>
      <Box
        sx={{
          // pt: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box>
          <BlockInfo>
            <Typography
              component={"p"}
              variant="overline"
              sx={{ fontSize: "16" }}
            >
              Etat d'attachement :
              <b> {operationAttachement[attachementState]} </b>
            </Typography>
          </BlockInfo>
        </Box>
        {operationAttachement[attachementState] !==
        operationAttachement.Valid_DEP ? (
          <ActionOperation
            idAttachment={id}
            state={attachementState}
            total={total}
          />
        ) : (
          decompteIds.length > 0 && (
            <PrintDecompteProvisoire listDecompte={decompteIds} />
          )
        )}
      </Box>
      <Box>
        <TabRender
          tabList={[
            {
              title: "details des articles ",
              component: (
                <TableArticleAttachment
                  data={data?.detailArticleAttachements}
                />
              ),
            },
            {
              title: "les operations",
              component: (
                <TableOperationAttachment data={data?.operationAttachement} />
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
}
