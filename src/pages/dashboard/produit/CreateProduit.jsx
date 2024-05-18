import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useForm } from "react-hook-form";
import ImageUpload from "../../../components/ImageImport/ImageUpload";
import useSelectFournisseur from "../../../hooks/inputs/useSelectFournisseur";
import useSelectMarque from "../../../hooks/inputs/useSelectMarque";
import useSelectCategorie from "../../../hooks/inputs/useSelectCategorie";
import { useState } from "react";
import {
  useCreateProduit,
  useUploadimage,
} from "../../../hooks/api/useProduitApi";
import { useNavigate } from "react-router-dom";
import useUploadDataXlsx from "../../../hooks/utils/useUploadDataXlsx";

export default function CreateProduit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { dataExcel = [], UploadButton } = useUploadDataXlsx();

  const { renderImage, image } = ImageUpload();

  const { selectFournisseurHTML, fournisseur } = useSelectFournisseur();
  const { selectMarqueHTML, Marque } = useSelectMarque();
  const { selectCategorieHTML, Categorie } = useSelectCategorie();
  const [quantite, setQuantite] = useState(0);

  const [error, setErrors] = useState("");
  const navigate = useNavigate();

  const mutationCreate = useCreateProduit({
    onSuccess: () => {
      navigate("/dashboard/produits/list-produit");
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
  });

  const uploadMutation = useUploadimage({
    onSuccess: () => {
      mutationCreate.mutate();
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
  });

  const onSubmit = (data) => {
    const datos = dataExcel.map((e) => e[0]);
    const obj = {
      produit: { ...data },
      fournisseur: {
        idFournisseur: fournisseur,
      },
      marque: {
        idMarque: Marque,
      },
      categorie: {
        idCategorie: Categorie,
      },
      quantite: quantite,
      numeroSerie: datos,
    };
    if (!dataExcel || dataExcel.length !== parseInt(quantite)) {
      setErrors(
        "Quantité invalide. La quantité doit être égale au nombre de numéros de série dans le fichier."
      );
    } else if (fournisseur && Marque && Categorie) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(obj));
      if (image) {
        formData.append("file", image);
      } else {
        formData.append("file", new Blob()); // Add an empty Blob if no image is present
      }
      mutationCreate.mutate(formData);
    } else {
      setErrors("vérifiez vos informations");
    }

    // const st = uploadMutation.mutate(formData);
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
        <Typography
          component="h2"
          variant="h5"
          sx={{
            mt: 2,
            mb: 6,
            fontWeight: 700,
            borderLeft: "4px solid",
            borderLeftColor: "primary.main",
            pl: 2,
          }}
        >
          Créer un produit
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "Start",
            alignItems: "start",
          }}
        >
          {/* start*/}

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
                fullWidth
                label="Quantité"
                variant="outlined"
                type="number"
                onChange={(e) => setQuantite(e.target.value)}
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
                label="Délai de garentie"
                variant="outlined"
                {...register("delai", {
                  required: "Le delai de garentie est obligatoire",
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
              sx={{ display: "flex", justifyContent: "left", gap: 2, my: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ p: 1.5 }}
                endIcon={<PlaylistAddRoundedIcon />}
              >
                Créer Produit
              </Button>
            </Box>
          </Box>

          {/* Fin du formulaire */}
          <Box>
            {/* Image upload */}
            <Box>{renderImage}</Box>
            <Box>
              {UploadButton(
                { mt: 2, mb: 1, p: 1, width: "100%" },
                "Importer les numéros de série"
              )}
            </Box>
            {dataExcel && dataExcel.length > 0 && (
              <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
                {dataExcel.length} numéros de série importés avec succès
              </Alert>
            )}
            {/* Fin ImageUpload */}
            {/* Errors */}
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
            {errors.quantity && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {errors.quantity.message}
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
        </Box>
      </Box>
    </>
  );
}
