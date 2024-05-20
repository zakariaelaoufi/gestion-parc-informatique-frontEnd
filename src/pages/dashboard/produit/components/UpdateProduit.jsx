import { useForm } from "react-hook-form";
import ImageUpload from "../../../../components/ImageImport/ImageUpload";
import useSelectCategorie from "../../../../hooks/inputs/useSelectCategorie";
import useSelectFournisseur from "../../../../hooks/inputs/useSelectFournisseur";
import useSelectMarque from "../../../../hooks/inputs/useSelectMarque";
import { useUpdateProduit } from "../../../../hooks/api/useProduitApi";
import { useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function UpdateProduit({ ProduitData = [] }) {
  const [error, setErrors] = useState("");
  const [image, setImage] = useState(null);

  const { selectFournisseurHTML, fournisseur } = useSelectFournisseur({
    idFournisseurUpdate: ProduitData?.fournisseur?.idFournisseur,
  });
  const { selectMarqueHTML, Marque } = useSelectMarque({
    idMarqueUpdate: ProduitData?.marqueID,
  });
  const { selectCategorieHTML, Categorie } = useSelectCategorie({
    idCategorieUpdate: ProduitData?.catrgorieID,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nomProduit: ProduitData?.nomProduit,
      description: ProduitData?.description,
      prix: ProduitData?.prix,
      delai: ProduitData?.delai || "",
      dateLivraison: ProduitData?.dateLivraison || "",
    },
  });

  const mutationUpload = useUpdateProduit({
    onError: () => {
      setErrors("vérifiez vos informations");
    },
    idProduit: ProduitData?.idProduit || -1,
  });

  const onSubmit = (data) => {
    const obj = {
      produit: { ...data, imageURL: ProduitData?.imageURL },
      fournisseur: {
        idFournisseur: fournisseur,
      },
      marque: {
        idMarque: Marque,
      },
      categorie: {
        idCategorie: Categorie,
      },
    };
    if (fournisseur && Marque && Categorie) {
      console.log(obj, "obj");
      const formData = new FormData();
      formData.append("data", JSON.stringify(obj));
      if (image) {
        formData.append("file", image);
      } else {
        formData.append("file", new Blob());
      }
      mutationUpload.mutate(formData);
    } else {
      setErrors("vérifiez vos informations");
    }
  };

  return (
    <>
      <Box
        sx={{
          my: 5,
          mb: 5,
          mx: "5%",
          "& input , & .MuiFormLabel-root , & .MuiInputBase-root": {
            background: "#fff",
          },
        }}
      >
        <Box>
          {errors.nomProduit && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errors.nomProduit.message}
            </Alert>
          )}
          {errors.prix && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errors.prix.message}
            </Alert>
          )}
          {errors.dateLivraison && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errors.dateLivraison.message}
            </Alert>
          )}
          {errors.delai && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errors.delai.message}
            </Alert>
          )}
          {errors.description && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errors.description.message}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "Start",
            alignItems: "start",
            mt: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mr: 3, width: "100%" }}
          >
            {error && (
              <Alert sx={{ mb: 3 }} severity="error">
                {error}
              </Alert>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <TextField
                type="text"
                fullWidth
                label="Nom de machine"
                variant="outlined"
                {...register("nomProduit", {
                  required: "Le nom est obligatoire",
                })}
              />
              <Box width={1}>{selectCategorieHTML}</Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
              <Box width={1}>{selectMarqueHTML}</Box>
              <TextField
                type="text"
                fullWidth
                label="Prix"
                variant="outlined"
                {...register("prix", {
                  required: "Le prix est obligatoire",
                })}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
              <TextField
                type="text"
                fullWidth
                label="Quantité"
                variant="outlined"
                value={ProduitData?.totalPiece}
                disabled
              />
              <Box width={1}>{selectFournisseurHTML}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 3,
                alignItems: "center",
                gap: 3,
                mt: 2,
              }}
            >
              <TextField
                fullWidth
                label="Date Livraison"
                variant="outlined"
                type="date"
                {...register("dateLivraison", {
                  required: "La date de livraison est obligatoire",
                })}
              />
              <TextField
                type="text"
                fullWidth
                label="Délai de garantie"
                variant="outlined"
                {...register("delai", {
                  required: "Le délai de garantie est obligatoire",
                })}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                type="text"
                fullWidth
                multiline
                rows={4}
                label="Description"
                placeholder="placer votre description ou remarque ici..."
                variant="outlined"
                {...register("description", {
                  required: "La description est obligatoire",
                })}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: 4,
              }}
            >
              <ImageUpload
                imageURL={ProduitData?.imageURL}
                onImageUpload={setImage}
              />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "left", gap: 2, my: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ p: 1.5 }}
                endIcon={<EditNoteIcon />}
              >
                Update Produit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
