import axios from "axios";

export const getAllUtilisateur = async () => {
  const url = "/utilisateur";
  const { data } = await axios.get(url);
  return data || [];
};

export const createUtilisateur = async (Utilisateur) => {
  const url = "/utilisateur";
  return await axios.post(url, Utilisateur);
};

export const deleteUtilisateur = async (idUtilisateur) => {
  const url = `/utilisateur/${idUtilisateur}`;
  return await axios.delete(url);
};

export const UpdateUtilisateur = async (idUtilisateur, Utilisateur) => {
  const url = `/utilisateur/${idUtilisateur}`;
  return await axios.put(url, Utilisateur);
};

export const getUtilisateurById = async (idUtilisateur) => {
  const url = `/utilisateur/${idUtilisateur}`;
  const { data } = await axios.get(url);
  return data || [];
};
