import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export function useListRender({  setData, reset = false, setReset = null }) {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);

  const handleDelete = (index) => {
    setList((prev) => prev?.filter((e) => e.id !== index));
    setData((prev) => {
      delete prev[index];
      return prev;
    });
  };

  const handleCreate = (index, data) => {
    setData((prev) => {
      return { ...prev, ...{ [`${index}`]: data } };
    });
  };

  useEffect(() => {
    if (reset) {
      setIndex(0);
      setList([]);
    }
  }, [reset]);


  const handleClickAdd = (obj) => {
    setReset && setReset(false);
    setList([...list, obj]);
    setIndex(index + 1);
  };
  const renderHTML = (
    <>
      {!reset &&
        list?.map((e, i) => (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut" }}
            key={e.id}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography variant="caption" sx={{ opacity: 0.5, mx: 1 }}>
              {i + 1}
            </Typography>
            {e.elem}
            <Box>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDelete(e.id)}
                // sx={{opacity:0.75}}
              >
                <DeleteRoundedIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        ))}
    </>
  );
  return {
    handleClickAdd,
    renderHTML,
    index,
    handleCreate,
  };
}
