import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetMarcheById } from "../../../../hooks/api/useMarcheApi";

export default function CreateArticleAttachmentDetail({ handleCreate, id }) {
  const { selectArticleHTML, article, qteMarche , priceMarche} =
    useSelectArticleAttachment(id);
  const { register, watch } = useForm();


  useEffect(() => {
    handleCreate( {
      detailArticleMarche: { id: article },
      qte: watch("qte"),
      price_UT: priceMarche,
    });
    console.log(article);
  }, [handleCreate, article, watch, watch("qte"), priceMarche]);
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
        {(
          <Box sx={{ width: "70px", textAlign: "center" }}>
            <b>  {qteMarche ? "/" + qteMarche : "-"} </b>
          </Box>
        )}
        -{/* <Button onClick={handleSubmit(onSubmit)}>ok</Button> */}
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

function useSelectArticleAttachment(id) {
  const [article, setArticle] = useState("");
  const marche = useGetMarcheById({ id });

  //   console.log("marche", marche.data);
  const handleChange = (event) => {
    setArticle(event.target.value);
    console.log("--", event);
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
          {marche?.data?.detailArticleMarches?.map((e) => (
            <MenuItem key={e.id} value={e}>
              {e?.article?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  
  return {
    selectArticleHTML: renderHTML,
    article: article.id,
    qteMarche: article.qte,
    priceMarche: article.price_UT,
  };
}
