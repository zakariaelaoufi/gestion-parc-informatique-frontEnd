import axios from "axios";

export const getAllEntiteTravail = async () => {
  const url = "/entitetravail";
  const { data } = await axios.get(url);
  return data || [];
};

export const getEntiteTravailById = async (idEntiteTravail) => {
  const url = `/entitetravail/${idEntiteTravail}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createEntiteTravail = async (entity) => {
  const url = "/entitetravail";
  return await axios.post(url, entity);
};

export const deleteEntiteTravail = async (idEntiteTravail) => {
  const url = `/entitetravail/${idEntiteTravail}`;
  return await axios.delete(url);
};

export const updateEntiteTravail = async (idEntiteTravail, entity) => {
  const url = `/entitetravail/${idEntiteTravail}`;
  return await axios.post(url, entity);
};
