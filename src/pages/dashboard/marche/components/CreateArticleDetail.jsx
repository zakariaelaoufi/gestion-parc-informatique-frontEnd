import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllArticle } from "../../../../hooks/api/useArticleApi";


export default function CreateArticleDetail({ handleCreate }) {
  const { selectArticleHTML, article } = useSelectArticle();
  const { register, watch } = useForm();
  const formData = useMemo(() => {
    return { article: { id: article }, qte: watch("qte"), price_UT: watch("price") };
  }, [article, watch, watch("qte"), watch("price")]);

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
        <Box sx={{ flex: 3 }}>{selectArticleHTML}</Box>
        <TextField
          label="Quentité"
          sx={{ flex: 2 }}
          fullWidth
          {...register("qte")}
        />
        <TextField
          label="Prix"
          sx={{ flex: 2 }}
          fullWidth
          {...register("price")}
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

function useSelectArticle() {
  const [article, setArticle] = useState("");
  console.log(article);
  const allArticle = useGetAllArticle();
  console.log(allArticle.data)
  const handleChange = (event) => {
    setArticle(event.target.value);
  };
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="dep_role_label">Article</InputLabel>
        <Select
          labelId="dep_role_label"
          id="department_select"
          value={article}
          label="Age"
          onChange={handleChange}
        >
          {allArticle?.data?.map((e) => (
            <MenuItem key={e.id} value={e.id} sx={{ display: "flex", alignItems: "end", gap: 1 }}>
              {e.name}  {e.unity && <span style={{ fontSize: "9px", padding: "3px" }}> / {e.unity}  </span>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectArticleHTML: renderHTML, article };
}
