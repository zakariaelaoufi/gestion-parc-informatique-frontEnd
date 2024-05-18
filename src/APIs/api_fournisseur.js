import axios from "axios";

export const getAllFournisseur = async () => {
  const url = "/fournisseur";
  const { data } = await axios.get(url);
  return data || [];
};

export const getSupplierById = async (idFournisseur) => {
  const url = `/fournisseur/${idFournisseur}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createFournisseur = async (supplier) => {
  const url = "/fournisseur";
  return await axios.post(url, supplier);
};

export const deleteSupplier = async (idFournisseur) => {
  const url = `/fournisseur/${idFournisseur}`;
  return await axios.delete(url);
};
