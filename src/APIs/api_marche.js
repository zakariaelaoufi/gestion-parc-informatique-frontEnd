import axios from "axios";

export const getAllMarche = async () => {
  // const url = "/marchesCommandes";
  const url = "/marchesCommandes/type/MARCHE";
  const { data } = await axios.get(url);
  return data || [];
};
export const getMarcheById = async (id) => {
  const url = `/marchesCommandes/${id}`;
  const { data } = await axios.get(url);
  // console.log("-->");
  return data || [];
};
export const getMarcheBySupplier = async (id) => {
  const url = `/marchesCommandes/fournisseur/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createMarche = async (marche) => {
  const url = "/marchesCommandes";
  return await axios.post(url, marche);
};

export const deleteMarche = async (id) => {
  const url = `/marchesCommandes/${id}`;
  return await axios.delete(url);
};
