import axios from "axios";

export const getAllTravaille = async () => {
  const url = "/travail";
  const { data } = await axios.get(url);
  return data || [];
};

export const getTravailleById = async (idTravail) => {
  const url = `/travail/${idTravail}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createTravaille = async (travail) => {
  const url = "/travail";
  return await axios.post(url, travail);
};

export const deleteTravaille = async (idTravail) => {
  const url = `/travail/${idTravail}`;
  return await axios.delete(url);
};

export const UpdateTravaille = async (travaille) => {
  const url = `/travail`;
  return await axios.put(url, travaille);
};
