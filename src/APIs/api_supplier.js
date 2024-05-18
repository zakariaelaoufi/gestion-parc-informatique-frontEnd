import axios from "axios";

export const getAllSupplier = async () => {
  const url = "/beneficiers/fournisseurs";
  const { data } = await axios.get(url);
  return data || [];
};

export const getSupplierById = async (id) => {
  const url = `/beneficiers/fournisseurs/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createSupplier = async (supplier) => {
  const url = "/beneficiers/fournisseurs";
  return await axios.post(url, supplier);
};

export const deleteSupplier = async (id) => {
  const url = `/beneficiers/fournisseurs/${id}`;
  return await axios.delete(url);
};
