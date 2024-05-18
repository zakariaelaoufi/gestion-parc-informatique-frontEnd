import { useState, useRef } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Aucune image est selectionné");
  const fileInputRef = useRef();

  const handleFile = (e) => {
    console.log("file", e.target.files[0], e);
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // setImage(URL.createObjectURL(file));
      setImage(file);
    }
  };
  console.log("image", image);

  const handleDelete = () => {
    setFileName("Aucune image est selectionné");
    setImage(null);
    fileInputRef.current.value = null;
  };

  const renderImage = (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "350px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px dashed #00000033",
            flexDirection: "column",
            gap: 3,
            width: "350px",
            height: "250px",
            cursor: "pointer",
            borderRadius: "10px",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <input type="file" hidden ref={fileInputRef} onChange={handleFile} />
          {image ? (
            <img
              src={image}
              alt={fileName}
              style={{
                width: "90%",
                height: "auto",
                objectFit: "cover",
                padding: "1px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <>
              <PermMediaIcon
                sx={{
                  fontSize: "60px",
                  color: "secondary.main",
                }}
              />
              <Typography variant="body1">Importer une image</Typography>
            </>
          )}
        </Box>
        {image && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: "10px",
              gap: 2,
              my: 2,
              bgcolor: "#ecfeff",
            }}
          >
            <Typography variant="body1"> {fileName} </Typography>
            <DeleteIcon onClick={handleDelete} sx={{ cursor: "pointer" }} />
          </Box>
        )}
      </Box>
    </>
  );

  return {
    renderImage,
    image,
  };
}

export default ImageUpload;
