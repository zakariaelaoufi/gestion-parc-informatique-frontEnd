import axios from "axios";

export const getAllDecompte = async () => {
  const url = "/piece/decompte";
  const { data } = await axios.get(url);
  return data || [];
};

export const getDecompteById = async (id) => {
  const url = `/piece/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const getDecompteByAttachment = async (attachment) => {
  const url = `/piece/decompte/${attachment}`;
  const { data } = await axios.get(url);
  return data || [];
};
export const getDecompteByMarcheId = async (id) => {
  const url = `/piece/decompte/marche/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createDecompte = async (decompte) => {
  const url = "/piece/decompte";
  return await axios.post(url, decompte);
};

export const deleteDecompte = async (id) => {
  const url = `/piece/decompte/${id}`;
  return await axios.delete(url);
};

//---------------- operation decompte ---------------------

export const createOperationDecompte = async (id, operation) => {
  const url = `/operationPiece/${id}`;
  return await axios.post(url, operation);
};

//--------------------- decompte definitif--------------//
export const createDecompteDefin = async (decompteDef) => {
  const url = "/piece/decompte_def";
  return await axios.post(url, decompteDef);
};

export const getDecompteDefByMarcheId = async (id) => {
  const url = `/piece/decompte_def/marche/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};
