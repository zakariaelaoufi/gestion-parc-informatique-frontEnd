import axios from "axios";

export const getAllCategorie = async () => {
  // const url = "/marchesCommandes";
  const url = "/categories";
  const { data } = await axios.get(url);
  return data || [];
};
export const getCategorieById = async (idCategorie) => {
  const url = `/categories/${idCategorie}`;
  const { data } = await axios.get(url);
  // console.log("-->");
  return data || [];
};

export const createCategorie = async (Categorie) => {
  const url = "/categories";
  return await axios.post(url, Categorie);
};

export const deleteCategorie = async (idCategorie) => {
  const url = `/categories/${idCategorie}`;
  return await axios.delete(url);
};

export const updateCategorie = async (idCategorie, categorie) => {
  const url = `/categories/${idCategorie}`;
  return await axios.put(url, categorie);
};
