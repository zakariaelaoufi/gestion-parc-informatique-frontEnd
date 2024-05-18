import {
  Alert,
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useListRender } from "../../../hooks/utils/useListRender";
import DateForm from "../../../components/Date/DateForm";
import useSelectMarche from "../../../hooks/inputs/useSelectMarche";
import CreateArticleAttachmentDetail from "./components/CreateArticleAttachmentDetail";
import { useCreateAttachment } from "../../../hooks/api/useAttachmentApi";
import TableUploadData from "./components/TableUploadData";
import useUploadDataAttachment from "./components/UploadDataAttachment";
// import CreateRibForm from "./components/CreateRibForm";

export default function CreateAttachment() {
  // const [supplier, setSupplier] = useState({});
  const [dataArticle, setDataArticle] = useState({});
  const [resetList, setResetList] = useState(false);
  const { selectMarcheHTML, marche } = useSelectMarche();
  const mutation = useCreateAttachment();
  const getCurrentUser = localStorage.getItem("user");

  const {
    register,
    handleSubmit,
    reset,
    control,
    // watch,
    // formState: { errors },
  } = useForm();
  // console.log(marche);
  const onSubmit = (data) => {
    console.log(data);
    console.log(dataArticle);
    console.log(marche);
    if (data && dataArticle && marche) {
      const allData = {
        attachement: {
          ...data,
          marche: { id: marche },
        },
        operationAttachement: {
          sender: "",
          receiver: "",
          Observation: "",
          user: { id: JSON.parse(getCurrentUser)?.id },
        },
        detailArticleAttachement: Object.values(dataArticle),
      };
      console.log("allData att ------>", allData);
      mutation.mutate(allData);
      reset();
      setResetList(true);
      // if (mutation.isSuccess) {
      // }
    } else console.log("error");
  };
  // const {} = useAddRIB({ ...{ setDataArticle, reset, setReset } });

  /************************** */

  useEffect(() => {
    setResetList(true);
  }, [marche]);

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
          sx={{ mt: 2, mb: 6, fontWeight: 700 }}
        >
          Créer un Attachement
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 3 }}>
              <TextField
                type="text"
                fullWidth
                required
                label="Numéro d'attachement"
                variant="outlined"
                {...register("numberAttachement")}
              />
              {/* <DateForm
                sx={{ width: "50%" }}
                label="date d'arrivée "
                name={"date_arrival_bo"}
                {...{ control }}
              /> */}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 4, gap: 3 }}>
              <DateForm
                sx={{ flex: 1 }}
                label="Date traveaux - Debut"
                name={"date_works_start"}
                {...{ control }}
              />
              <DateForm
                sx={{ flex: 1 }}
                label="Date traveaux - Fin"
                name={"date_works_end"}
                {...{ control }}
              />
            </Box>

            <Box>{selectMarcheHTML}</Box>
          </Box>
          <>
            {marche && (
              <AddArticleDetail
                setDataArticle={setDataArticle}
                reset={resetList}
                setReset={setResetList}
                id={marche}
              />
            )}
          </>
          <Box sx={{ display: "flex", justifyContent: "right", gap: 2, my: 2 }}>
            <Button
              // type="reset"
              variant="text"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={() => {
                reset();
                setResetList(true);
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              // size="large"
              endIcon={<PlaylistAddRoundedIcon />}
            >
              Créer
            </Button>
          </Box>
        </Box>
        {mutation.isSuccess && (
          <Alert severity="success" sx={{ my: 1 }}>
            L'attachement est bien créé
          </Alert>
        )}
        {mutation.isError && (
          <Alert severity="error" sx={{ my: 1 }}>
            L'attachement n'est pas créé
          </Alert>
        )}
        {/* {"showError" && (
            <Alert severity="error" sx={{ my: 1 }}>
              vérifiez vos informations
            </Alert>
          )} */}
      </Box>
      {/* <Button onClick={handleSubmit(onSubmit)}>ok</Button> */}
    </>
  );
}

function AddArticleDetail({
  setDataArticle,
  reset = false,
  setReset = null,
  id,
}) {
  const { UploadButton, articleAttachment = [] } = useUploadDataAttachment({
    setData: setDataArticle,
    reset,
    setReset,
  });
  const { handleClickAdd, renderHTML, index, handleCreate } = useListRender({
    setData: setDataArticle,
    reset,
    setReset,
  });

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent:  articleAttachment.length < 1 ? "space-between" : "end",
          alignItems: "center",
          my: 4,
        }}
      >
        {articleAttachment.length < 1 && (
          <Button
            startIcon={""}
            size="small"
            onClick={() => {
              handleClickAdd({
                id: index,
                elem: (
                  <CreateArticleAttachmentDetail
                    id={id}
                    handleCreate={(data) => handleCreate(index, data)}
                  />
                ),
              });
            }}
          >
            Ajouter article details
          </Button>
        )}
        <Box>{UploadButton}</Box>
      </Box>

      <Box>
        <TableUploadData data={articleAttachment} />
      </Box>
      {articleAttachment.length < 1 && renderHTML}
    </Box>
  );
}
