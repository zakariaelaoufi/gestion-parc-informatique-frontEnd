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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useListRender } from "../../../hooks/utils/useListRender";
import CreateRibForm from "./components/CreateRibForm";
import { useCreateSupplier } from "../../../hooks/api/useSupplierApi";
import Modal from "../../../components/Modal/Modal";

export default function CreateSupplier() {
  const [dataRib, setDataRib] = useState({});
  const [resetList, setResetList] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm();

  const mutation = useCreateSupplier({
    onSuccess: () => {
      reset();
      setResetList(true);
    },
  });

  console.log(mutation);
  const onSubmit = (data) => {
    // setSupplier({ ...data,ribs: Object.values(dataRib)} )

    if (data && dataRib) {
      mutation.mutate({ ...data, ribs: Object.values(dataRib) });
    
    } else {
      console.log("error");
    }
  };
  // const {} = useAddRIB({ ...{ setDataRib, reset, setReset } });
  return (
    <>
      {/* {supplier} */}
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
          Créer un fournisseur
        </Typography>
        {/* <Divider sx={{ my: 4 }} /> */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <TextField
              label="Nom"
              required
              fullWidth
              {...register("name", { required: true })}
            />
            <TextField
              label="ICE"
              required
              fullWidth
              {...register("ice", { required: true })}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 4 }}>
            <TextField
              // type="number"
              label="Identifient Fiscal"
              required
              fullWidth
              {...register("identifyFiscal", { required: true })}
            />
            <TextField
              // type="number"
              label="Numero CNSS"
              required
              fullWidth
              {...register("numberCNSS", { required: true })}
            />
            <TextField
              label="Patente"
              required
              fullWidth
              {...register("patent", { required: true })}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 4 }}>
            <TextField
              label="Tel"
              required
              fullWidth
              {...register("telephone", { required: true })}
            />
            <TextField
              label="Fax"
              required
              fullWidth
              {...register("fax", { required: true })}
            />
          </Box>
          <Box sx={{}}>
            <TextField
              label="Adresse"
              required
              fullWidth
              multiline
              rows={3}
              {...register("address", { required: true })}
            />
          </Box>
          <>
            <AddRIB
              setDataRib={setDataRib}
              reset={resetList}
              setReset={setResetList}
            />
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
            {/* <Modal btnName=" Créer"   actionType="submit" >
sss
            </Modal> */}
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
          {mutation.isSuccess && (
            <Alert severity="success" sx={{ my: 1 }}>
              le fournisseur est bien créé
            </Alert>
          )}
          {mutation.isError && (
            <Alert severity="error" sx={{ my: 1 }}>
              le fournisseur n'est pas créé
            </Alert>
          )}
        </Box>
      </Box>
      {/* <Button onClick={handleSubmit(onSubmit)}>ok</Button> */}
    </>
  );
}

function AddRIB({ setDataRib, reset = false, setReset = null }) {
  const { handleClickAdd, renderHTML, index, handleCreate } = useListRender({
    setData: setDataRib,
    reset,
    setReset,
  });

  return (
    <Box sx={{ my: 4 }}>
      <Button
        startIcon={<AddRoundedIcon />}
        size="small"
        onClick={() => {
          handleClickAdd({
            id: index,
            elem: (
              <CreateRibForm
                handleCreate={(data) => handleCreate(index, data)}
              />
            ),
          });
        }}
      >
        Ajouter RIB
      </Button>
      {renderHTML}
    </Box>
  );
}
