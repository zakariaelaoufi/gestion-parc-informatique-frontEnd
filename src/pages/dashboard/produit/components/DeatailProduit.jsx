import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import {
  useDownloadimage,
  useGetProduitById,
} from "../../../../hooks/api/useProduitApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableInventaire from "./TableInventaire";
import TableFournisseur from "./TableFournisseur";
import { serverIMG } from "../../../../global";

export default function DeatailProduit({ idProduit }) {
  const produitByID = useGetProduitById({ idProduit })?.data;
  if (!idProduit) return <></>;
  console.log("produitByID", produitByID);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Produit info"}
            infoList={[
              `Nom produit : ${produitByID?.nomProduit}`,
              `Prix : ${parseFloat(produitByID?.prix).toFixed(2)} DH`,
              `Quantite : ${produitByID?.totalPiece}`,
              `Date livraison : ${produitByID?.dateLivraison}`,
              `Date expiration de garantie  : ${produitByID?.dateExperation}`,
              `Categorie : ${produitByID?.categorie?.libelle}`,
              `Marque : ${produitByID?.marque?.nomMarque}`,
            ]}
          />
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "details des inventaires",
              component: <TableInventaire data={produitByID?.inventaireList} />,
            },
            {
              title: "details de fournisseur",
              component: <TableFournisseur data={produitByID?.fournisseur} />,
            },
          ]}
        />
      </Box>
      <Grid container spacing={1} sx={{ my: 2 }}>
        <Grid item sx={{ mx: "auto" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Produit Image"
              height="140"
              sx={{ objectFit: "contain" }}
              image={`${serverIMG}/${produitByID?.imageURL}`}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Typography textAlign={"justify"}>
            <BlockInfo
              title={"Description du produit"}
              infoList={[`${produitByID?.description}`]}
            />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
