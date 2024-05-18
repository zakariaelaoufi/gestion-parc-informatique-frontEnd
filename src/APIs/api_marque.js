import axios from "axios";

export const getAllMarque = async () => {
  // const url = "/marchesCommandes";
  const url = "/marques";
  const { data } = await axios.get(url);
  return data || [];
};
export const getMarqueeById = async (idMarque) => {
  const url = `/marques/${idMarque}`;
  const { data } = await axios.get(url);
  // console.log("-->");
  return data || [];
};
export const getMarqueById = async (idMarque) => {
  const url = `/marques/${idMarque}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createMarque = async (Marque) => {
  const url = "/marques";
  return await axios.post(url, Marque);
};

export const deleteMarque = async (idMarque) => {
  const url = `/marques/${idMarque}`;
  return await axios.delete(url);
};

export const updateMarque = async (idMarque, marque) => {
  const url = `/marques/${idMarque}`;
  return await axios.put(url, marque);
};
