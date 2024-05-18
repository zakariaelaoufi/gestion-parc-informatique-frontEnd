import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useListRender } from "../../hooks/useListRender";
import CreateArticleDetail from "./components/CreateArticleDetail";
import { useListRender } from "../../../hooks/utils/useListRender";
import CreateArticle from "../article/components/CreateArticle";
import DateForm from "../../../components/Date/DateForm";
import useSelectDepartement from "../../../hooks/inputs/useSelectDepartement";
import useSelectSupplier from "../../../hooks/inputs/useSelectSupplier";
import { useCreateMarche } from "../../../hooks/api/useMarcheApi";
import UploadDataMarche from "./components/UploadDataMarche";
import useUploadDataMarche from "./components/UploadDataMarche";
import TableUploadData from "./components/TableUploadData";

export default function CreateMarche() {
  const [dataArticle, setDataArticle] = useState({});
  const [resetData, setResetData] = useState(false);
  console.log(resetData);
  const { selectDepartementHTML, department } = useSelectDepartement({
    reset: resetData,
  });
  const { selectSupplierHTML, supplier } = useSelectSupplier({
    reset: resetData,
  });

  // const { selectDepartementHTML, department } = useSelectDepartement();
  // const { selectSupplierHTML, supplier } = useSelectSupplier();

  // const mutation = useCreateMarche();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    // formState: { errors },
  } = useForm();

  const mutation = useCreateMarche({
    onSuccess: () => {
      reset();
      setResetData((p) => !p);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(dataArticle);
    const obj = {
      marche: {
        ...data,
        fournisseur: { id: supplier },
        departement: { id: department },
        type: "MARCHE",
      },
      detailArticleMarche: Object.values(dataArticle),
    };
    console.log(obj);

    if (data && dataArticle && supplier && department) {
      mutation.mutate(obj);

      // if (mutation.isSuccess) {
      //   reset();
      //   setResetList(true);
      //   // setMarche("");
      // }
    } else console.log("error");
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
          sx={{ mt: 2, mb: 6, fontWeight: 700 }}
        >
          Creation Marche
        </Typography>
        {/* <Divider sx={{ my: 4 }} /> */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <TextField
              label="Numero marche"
              required
              fullWidth
              {...register("numberMarche", { required: true })}
            />
            <TextField
              label="montant"
              required
              fullWidth
              {...register("montant", { required: true })}
            />
          </Box>
          <Box sx={{ my: 4 }}>
            <TextField
              label="désignation"
              required
              fullWidth
              multiline
              rows={2}
              {...register("libelle", { required: true })}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 4 }}>
            {/* <TextField
              label="date_notif"
              required
              fullWidth
              {...register("date_notif", { required: true })}
            /> */}

            <DateForm
              sx={{ flex: 1 }}
              label="Date notification"
              name={"date_notif"}
              reset={resetData}
              {...{ control }}
            />

            <FormControl fullWidth sx={{ flex: 1 }}>
              <InputLabel id="Type_finance">Type_finance</InputLabel>
              <Select
                {...register("type_finance", { required: true })}
                labelId="Type finance"
                id="Type_finance"
                value={watch("type_finance") || "interne"}
                label="Age"
                required
                fullWidth
              >
                <MenuItem value={"interne"}>Interne</MenuItem>
                <MenuItem value={"externe"}>Externe</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, my: 4 }}>
            {selectDepartementHTML}
            {selectSupplierHTML}
          </Box>

          <>
            <AddArticleDetail
              setDataArticle={setDataArticle}
              reset={resetData}
              setReset={setResetData}
            />
          </>
          <Box sx={{ py: 0 }}>
            {mutation.isSuccess && (
              <Alert severity="success" sx={{ my: 1 }}>
                Marché est bien créé
              </Alert>
            )}
            {mutation.isError && (
              <Alert severity="error" sx={{ my: 1 }}>
                Marché n'est pas créé
              </Alert>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right", gap: 2, my: 2 }}>
            <Button
              // type="reset"
              variant="text"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={() => {
                reset();
                setResetData((p) => !p);
                // setMarche("");
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

          {/* {"showError" && (
            <Alert severity="error" sx={{ my: 1 }}>
              vérifiez vos informations
            </Alert>
          )} */}
        </Box>
      </Box>
      {/* <Button onClick={handleSubmit(onSubmit)}>ok</Button> */}
    </>
  );
}

function AddArticleDetail({ setDataArticle, reset = false, setReset = null }) {
  const { UploadButton, articleMarche = [] } = useUploadDataMarche({
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
          justifyContent: "space-between",
          alignItems: articleMarche.length > 0 ? "start" : "center",
          flexDirection: articleMarche.length > 0 ? "column-reverse" : "row",
          my: 4,
        }}
      >
       {articleMarche.length < 1 && <Button
          variant="text"
          startIcon={""}
          size="small"
          onClick={() => {
            handleClickAdd({
              id: index,
              elem: (
                <CreateArticleDetail
                  handleCreate={(data) => handleCreate(index, data)}
                />
              ),
            });
          }}
        >
          + Ajouter article details
        </Button> } 
        <Box
          sx={articleMarche.length > 0 ? { width: "100% ", textAlign: "end" } : {}}
        >
          <Box>
            {UploadButton}
            <CreateArticle variant="outlined" btnName="Nouvel article" />
          </Box>
          <TableUploadData data={articleMarche} />
        </Box>
      </Box>
      {   articleMarche.length < 1 && renderHTML}
    </Box>
  );
}

// function useSelectDepartement() {
//   const [department, setDepartment] = useState("");
//   const allDepartment = useGetAllDepartment();
//   // console.log(allDepartment.data)
//   const handleChange = (event) => {
//     setDepartment(event.target.value);
//   };
//   const renderHTML = (
//     <>
//       <FormControl fullWidth>
//         <InputLabel id="dep_role_label">Departement</InputLabel>
//         <Select
//           labelId="dep_role_label"
//           id="department_select"
//           value={department}
//           label="Age"
//           onChange={handleChange}
//         >
//           {allDepartment?.data?.map((e) => (
//             <MenuItem key={e.id} value={e.id}>
//               {e.nameDepartement}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </>
//   );
//   return { selectDepartementHTML: renderHTML, department };
// }

// function useSelectSupplier() {
//   const [supplier, setSupplier] = useState("");
//   const allSupplier = useGetAllSupplier();
//   console.log(allSupplier.data);
//   const handleChange = (event) => {
//     setSupplier(event.target.value);
//   };
//   const renderHTML = (
//     <>
//       <FormControl fullWidth>
//         <InputLabel id="dep_role_label">Fournisseur</InputLabel>
//         <Select
//           labelId="dep_role_label"
//           id="department_select"
//           value={supplier}
//           label="Age"
//           onChange={handleChange}
//         >
//           {allSupplier?.data?.map((e) => (
//             <MenuItem key={e.id} value={e.id}>
//               {e.fullName}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </>
//   );
//   return { selectSupplierHTML: renderHTML, supplier };
// }

// function DateForm(props) {
//   const { name, control } = props;

//   const dateFormat = (date) => {
//     const d = date.$D.toString().length > 1 ? `${date.$D}` : `0${date.$D}`;
//     const m = date.$M + 1;
//     const y = date.$y;
//     return `${d}/${m}/${y}`;
//   };
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <DatePicker
//           {...{ ...props }}
//           placeholderText="Select date"
//           onChange={(date) => field.onChange(dateFormat(date))}
//           selected={field.value}
//           inputFormat="DD/MM/YYYY"
//           format="DD/MM/YYYY"
//           fullWidth
//         />
//       )}
//     />
//   );
// }
