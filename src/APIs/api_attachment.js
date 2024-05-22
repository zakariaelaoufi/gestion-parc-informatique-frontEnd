import axios from "axios";

export const getAllAttachment = async () => {
  const url = "/attachments";
  const { data } = await axios.get(url);
  return data || [];
};

export const getAllNotAvailableAttachment = async () => {
  // const url = "/marchesCommandes";
  const url = "/attachments/notavailable";
  const { data } = await axios.get(url);
  return data || [];
};

export const UpdateAttachment = async (idAttachment, attachment) => {
  console.log("attachments axios", idAttachment, attachment);
  const url = `/attachments/${idAttachment}`;
  return await axios.put(url, attachment);
};

export const getAttachmentById = async (idAttachment) => {
  const url = `/attachments/${idAttachment}`;
  const { data } = await axios.get(url);
  return data || [];
};
export const getAttachmentByMarche = async (idAttachment) => {
  const url = `/attachments/marche/${idAttachment}`;
  const { data } = await axios.get(url);
  return data || [];
};
export const getAttachmentBySupplier = async (idAttachment) => {
  const url = `/attachments/fournisseur/${idAttachment}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createAttachment = async (attachment) => {
  console.log("attachment axios", attachment);
  const url = "/attachments";
  return await axios.post(url, attachment);
};

export const deleteAttachment = async (idAttachment) => {
  const url = `/attachments/${idAttachment}`;
  return await axios.delete(url);
};

//---------------- operation Attachements ---------------------

export const createOperationAttachment = async (id, operation) => {
  const url = `/operationAttachments/${id}`;
  return await axios.post(url, operation);
};
