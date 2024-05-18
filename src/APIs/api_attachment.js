import axios from "axios";

export const getAllAttachment = async () => {
  const url = "/attachements";
  const { data } = await axios.get(url);
  return data || [];
};

export const getAttachmentById = async (id) => {
  const url = `/attachements/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};
export const getAttachmentByMarche = async (id) => {
  const url = `/attachements/marche/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};
export const getAttachmentBySupplier = async (id) => {
  const url = `/attachements/fournisseur/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createAttachment = async (attachment) => {
  const url = "/attachements";
  return await axios.post(url, attachment);
};

export const deleteAttachment = async (id) => {
  const url = `/attachements/${id}`;
  return await axios.delete(url);
};

//---------------- operation Attachements ---------------------

export const createOperationAttachment = async (id, operation) => {
  const url = `/operationAttachements/${id}`;
  return await axios.post(url, operation);
};
