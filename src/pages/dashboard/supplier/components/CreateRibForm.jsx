import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const listBank = ["Bank 1 ", "Bank 3", "Bank 2"];

export default function CreateRibForm({ handleCreate }) {
  const { register, watch } = useForm();
  const [bank, setBank] = useState("");
  const formData = useMemo(() => {
    return { rib: watch("rib"), bank: bank, agency: watch("agency") };
  }, [bank, watch, watch("rib"), watch("agency")]);

  useEffect(() => {
    handleCreate(formData);
  }, [handleCreate, formData]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          // flexDirection:"column",
          alignItems: "center",
          gap: 2,
          my: 1,
        }}
      >
        <TextField
          label="RIB"
          sx={{ flex: 3 }}
          required
          fullWidth
          {...register("rib", { required: true })}
        />
        <Autocomplete
          options={listBank}
          sx={{ flex: 2 }}
          inputValue={bank}
          onInputChange={(event, newInputValue) => {
            setBank(newInputValue);
          }}
          freeSolo
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Nom de Bank " required fullWidth />
          )}
        />
        <TextField
          label="Nom d'agence"
          sx={{ flex: 2 }}
          fullWidth
          {...register("agency")}
        />
        {/* <Button onClick={handleSubmit(onSubmit)}>ok</Button> */}
      </Box>
      {/* <Box>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleDelete(index)}
            // sx={{opacity:0.75}}
          >
            <DeleteRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box> */}
    </>
  );
}
