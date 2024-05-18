import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setArticleData = null,
}) {
  /********** state ***************** */


  const [articleName, setArticleName] = useState(
    isUpdate ? data?.article_name : ""
  );
  const [articleUnity, setArticleUnity] = useState(
    isUpdate ? data?.article_unity : ""
  );

  const [articleDescription, setArticleDescription] = useState(
    isUpdate ? data?.article_description : ""
  );



  /**********  Submit and validation ****************** */

  useEffect(() => {
    setArticleData({
      articleName,
      articleUnity,
      articleDescription
    });
  }, [articleDescription, articleName, articleUnity, setArticleData]);

  console.log("--> c.Art");
  return (
    <>
      <Box>
        <TextField
          margin="normal"
          required
          id="article_name"
          label="Nom d'article"
          name="articleName"
          autoFocus
          fullWidth
          value={articleName}
          onChange={(e) => setArticleName(e.target.value)}
        />

        <TextField
          margin="normal"
          id="article_unity"
          label="Unité d'article"
          name="articleUnity"
          fullWidth
          value={articleUnity}
          onChange={(e) => setArticleUnity(e.target.value)}
        />


        <TextField
          margin="normal"
          id="article_description"
          label="Description d'article"
          name="articleDescription"
          fullWidth
          value={articleDescription}
          onChange={(e) => setArticleDescription(e.target.value)}
        />

      </Box>
    </>
  );
}
