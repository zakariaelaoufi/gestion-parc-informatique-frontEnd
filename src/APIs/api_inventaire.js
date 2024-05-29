import axios from "axios";

export const getAllInventaire = async () => {
  const url = "/inventaires";
  const { data } = await axios.get(url);
  return data || [];
};

export const getAllAvailableInventaire = async () => {
  const url = "/inventaires/available";
  const { data } = await axios.get(url);
  return data || [];
};

export const getInventaireById = async (idInventaire) => {
  const url = `/inventaires/${idInventaire}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createInventaire = async (Inventaire) => {
  const url = "/inventaires";
  return await axios.post(url, Inventaire);
};

export const createMoreInventaire = async (moreInventaire) => {
  const url = "/inventaires/addmore";
  return await axios.post(url, moreInventaire);
};

export const deleteInventaire = async (idInventaire) => {
  const url = `/inventaires/${idInventaire}`;
  return await axios.delete(url);
};
