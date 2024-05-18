import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    // Perform upload logic here
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // Example: You can send formData to your backend API using fetch or axios
      // Replace 'your-upload-endpoint' with your actual endpoint
      fetch("http://localhost:8080/api/produits/test", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Image uploaded successfully!");
            // Add any further logic here, like displaying a success message
          } else {
            console.error("Error uploading image:", response.statusText);
            // Add error handling logic here, like displaying an error message
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          // Add error handling logic here, like displaying an error message
        });
    } else {
      console.warn("No image selected for upload");
      // Add warning logic here, like displaying a message to select an image
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
