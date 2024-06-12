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
  const [image, setImage] = useState(ProduitData?.imageURL);

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
      marque: {
        idMarque: Marque,
      },
      categorie: {
        idCategorie: Categorie,
      },
    };
    if (Marque && Categorie) {
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

            <TextField
              type="text"
              fullWidth
              label="Nom de machine"
              variant="outlined"
              {...register("nomProduit", {
                required: "Le nom est obligatoire",
              })}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box sx={{ mt: 2 }} width={1}>
                {selectCategorieHTML}
              </Box>
              <Box sx={{ mt: 2 }} width={1}>
                <Box width={1}>{selectMarqueHTML}</Box>
              </Box>
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
