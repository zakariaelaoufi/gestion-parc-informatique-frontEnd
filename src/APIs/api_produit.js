import axios from "axios";

export const getAllProduit = async () => {
  const url = "/produits";
  const { data } = await axios.get(url);
  return data || [];
};

export const getProduitById = async (idProduit) => {
  console.log("idProduit axios", idProduit);
  const url = `/produits/${idProduit}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createProduit = async (formData) => {
  const url = "/produits";
  return await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createMoreInventaireLV = async (moreData) => {
  const url = "/produits/addmore";
  return await axios.post(url, moreData);
};

export const updateProduit = async (formData, idProduit) => {
  const url = `/produits/${idProduit}`;
  return await axios.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduit = async (idProduit) => {
  const url = `/produits/${idProduit}`;
  return await axios.delete(url);
};

export const uploadImage = async (file) => {
  console.log("dd", file.get("file"));
  const url = "/produits/upload/image";
  return await axios.post(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadImage = async (imageURL) => {
  const url = `/produits/image/${imageURL}`;
  console.log("imageURL axios", imageURL);
  return await axios.get(url, {
    responseType: "blob",
  });
};
