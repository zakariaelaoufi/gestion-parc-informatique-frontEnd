import { useState, useRef } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, CardMedia, Typography } from "@mui/material";
import { serverIMG } from "../../global";

function ImageUpload({ imageURL = null, onImageUpload }) {
  const [image, setImage] = useState(imageURL || null);
  const [fileName, setFileName] = useState("Aucune image est sélectionnée");
  const [displayedIMG, setDisplayedIMG] = useState(
    `${serverIMG}/${imageURL}` || null
  );
  const fileInputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setDisplayedIMG(URL.createObjectURL(file));
      setImage(file);
      onImageUpload(file || null);
    }
  };
  console.log(fileName);

  const handleDelete = () => {
    setFileName("Aucune image est sélectionnée");
    setImage(null);
    setDisplayedIMG(null);
    fileInputRef.current.value = null;
    onImageUpload(null);
  };

  return (
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
          <CardMedia
            component="img"
            alt={fileName}
            height="80%"
            width={"90%"}
            sx={{
              objectFit: "contain",
              padding: "1px",
              borderRadius: "10px",
            }}
            image={displayedIMG}
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
          <Typography variant="body1">
            {fileName !== "Aucune image est sélectionnée" ? fileName : imageURL}
          </Typography>
          <DeleteIcon onClick={handleDelete} sx={{ cursor: "pointer" }} />
        </Box>
      )}
    </Box>
  );
}

export default ImageUpload;
