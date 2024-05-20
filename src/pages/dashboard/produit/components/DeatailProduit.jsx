import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useGetProduitById } from "../../../../hooks/api/useProduitApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableInventaire from "./TableInventaire";
import TableFournisseur from "./TableFournisseur";
import { serverIMG } from "../../../../global";
import UpdateProduit from "./UpdateProduit";
import EditIcon from "@mui/icons-material/Edit";
import Drawer from "../../../../components/Drawer/Drawer";

export default function DeatailProduit({ idProduit }) {
  const produitByID = useGetProduitById({ idProduit })?.data;
  if (!idProduit) return <></>;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
        }}
      >
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
        <Box sx={{ mt: 1.5 }}>
          <Drawer
            width="59.5%"
            btnIcon={<EditIcon />}
            title="Update un produit"
          >
            <UpdateProduit ProduitData={produitByID} />
          </Drawer>
        </Box>
      </Box>
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
          <Card sx={{ width: "auto" }}>
            <CardMedia
              component="img"
              alt="Produit Image"
              height="250"
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
