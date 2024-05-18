import { useContext, useState } from "react";
import { AttachmentContext } from "./AttachmentContext";
import { Controller, useForm } from "react-hook-form";
import { ModalContainer } from "./AttachmentFunctionsModal";

import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export function CreateAttachmentForm({ isUpdate }) {
  const { modalStateData } = useContext(AttachmentContext);
  const { control, register, handleSubmit } = useForm();
  /*********** * ************/
  const department = [
    { id: 1, name: "dsi" },
    { id: 3, name: "cpt" },
    { id: 4, name: "bo" },
  ];
  const marche = [
    { id: 1, nbr: "4107818150", name: "marche-1" },
    { id: 2, nbr: "0037077808", name: "marche-2" },
    { id: 3, nbr: "8798980521", name: "marche-3" },
  ];

  /********** state ***************** */

  /*********** ********/

  const onSubmit = (data) => {
    // console.log(dateFormat(data.date_work_start));
    // console.log(dateFormat(data.date_work_end));
    console.log(data);
  };

  return (
    <Box
      sx={{ width: "42vw", minWidth: "100%", maxWidth: "620px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" component="h3">
        {isUpdate ? "Modifier l'attachement" : "Créer l'attachement"}
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Box>
        <TextField
          type="text"
          fullWidth
          required
          label="Numéro d'attachement"
          variant="outlined"
          {...register("att_nbr")}
        />
        <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 1 }}>
          <DateForm
            sx={{ flex: 1 }}
            label="Date traveaux - Debut"
            name={"date_work_start"}
            {...{ control }}
          />
          <RemoveRoundedIcon sx={{ opacity: 0.5 }} />
          <DateForm
            sx={{ flex: 1 }}
            label="Date traveaux - Fin"
            name={"date_work_end"}
            {...{ control }}
          />
        </Box>
        <DateForm
          sx={{ width: "100%", mb: 3 }}
          label="date d'arrivée "
          name={"date_arrival_bo"}
          {...{ control }}
        />
        <Autocomplete
          disablePortal
          options={department.map((e) => e.name)}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              fullWidth
              required
              {...params}
              label="Département"
              {...register("department")}
            />
          )}
        />
        <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 1 }}>
          <Autocomplete
            disablePortal
            options={marche.map((e) => e.nbr)}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                fullWidth
                required
                {...params}
                label="Marché"
                {...register("marche")}
              />
            )}
          />
          <MarcheChildModal />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
        <Button variant="text" onClick={modalStateData.handleClose}>
          Annuler
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          {isUpdate ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </Box>
  );
}

CreateAttachmentForm.propTypes = {
  isUpdate: PropTypes.bool,
};

/******************** ******************/

function DateForm(props) {
  const { name, control } = props;

  const dateFormat = (date) => {
    const d = date.$D.toString().length > 1 ? `${date.$D}` : `0${date.$D}`;
    const m = date.$M + 1;
    const y = date.$y;
    return `${d}/${m}/${y}`;
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          {...{ ...props }}
          placeholderText="Select date"
          onChange={(date) => field.onChange(dateFormat(date))}
          selected={field.value}
          inputFormat="DD/MM/YYYY"
          format="DD/MM/YYYY"
        />
      )}
    />
  );
}

function MarcheChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ height: "100%", p: 2, transform: "scale(0.95)" }}
        onClick={handleOpen}
      >
        <AddRoundedIcon />
      </Button>

      <ModalContainer state={open} close={handleClose}>
        <CreateMarcheForm isUpdate={false} cancel={handleClose} />
      </ModalContainer>
    </>
  );
}
function FournisseurChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ height: "100%", p: 2, transform: "scale(0.95)" }}
        onClick={handleOpen}
      >
        <AddRoundedIcon />
      </Button>

      <ModalContainer state={open} close={handleClose}>
        <CreateFournisseurForm isUpdate={false} cancel={handleClose} />
      </ModalContainer>
    </>
  );
}
function CreateMarcheForm({ isUpdate = false, cancel = null }) {
  const { control, register, handleSubmit } = useForm();
  const onSubmit = () => {
    cancel();
  };
  const fournisseur = [
    { id: 1, ice: "245106800646", name: "fourn 1" },
    { id: 2, ice: "317779673978", name: "fourn 2" },
    { id: 3, ice: "989810022002", name: "fourn 3" },
  ];
  return (
    <>
      <Box
        sx={{ width: "32vw", minWidth: "100%", maxWidth: "480px" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" component="h3">
          {isUpdate ? "Modifier le marché" : "Créer le marché"}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box>
          <TextField
            type="text"
            fullWidth
            required
            label="Numéro de marché"
            variant="outlined"
            {...register("marche_nbr")}
          />
          <TextField
            sx={{ mt: 2 }}
            type="text"
            fullWidth
            required
            label="Désignation"
            variant="outlined"
            {...register("Designation")}
          />

          <Box sx={{ display: "flex", alignItems: "center", my: 2, gap: 1 }}>
            <DateForm
              sx={{ flex: 5 }}
              label="Date notification "
              name={"date_notification"}
              {...{ control }}
            />
            <TextField
              type="number"
              sx={{ flex: 3 }}
              label="Montant (DHs)"
              variant="outlined"
              {...register("montant")}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Autocomplete
              disablePortal
              options={fournisseur.map((e) => `${e.ice} - ${e.name}`)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  required
                  {...params}
                  label="fournisseur"
                  {...register("fournisseur")}
                />
              )}
            />
            <FournisseurChildModal />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
        <Button variant="text" onClick={cancel} color="warning">
          Annuler
        </Button>
        <Button variant="contained" color="warning" type="submit">
          {isUpdate ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </>
  );
}
function CreateFournisseurForm({ isUpdate = false, cancel = null }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    cancel();
  };

  return (
    <>
      <Box
        sx={{ width: "28vw", minWidth: "100%", maxWidth: "380px" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" component="h3">
          {isUpdate ? "Modifier le fournisseur" : "Créer un fournisseur"}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box>
          <TextField
            type="text"
            fullWidth
            required
            label="Numéro de fournisseur"
            variant="outlined"
            {...register("fourn_nbr")}
          />
          <TextField
            sx={{ mt: 1 }}
            type="text"
            fullWidth
            required
            label="ICE"
            variant="outlined"
            {...register("ice")}
          />
          <TextField
            sx={{ mt: 1 }}
            type="text"
            fullWidth
            required
            label="Nom fournisseur"
            variant="outlined"
            {...register("name")}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
        <Button variant="text" onClick={cancel} color="info">
          Annuler
        </Button>
        <Button variant="contained" color="info" type="submit">
          {isUpdate ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </>
  );
}
