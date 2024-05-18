import axios from "axios";

export const getAllAffectation = async () => {
  // const url = "/marchesCommandes";
  const url = "/affectation";
  const { data } = await axios.get(url);
  return data || [];
};

export const getAllAvailableAffectation = async () => {
  // const url = "/marchesCommandes";
  const url = "/affectation/available";
  const { data } = await axios.get(url);
  return data || [];
};

export const getAffectationById = async (idAffectation) => {
  console.log("idAffectation axios", idAffectation);
  const url = `/affectation/${idAffectation}`;
  const { data } = await axios.get(url);
  // console.log("-->");
  return data || "{}";
};

export const createAffectation = async (affectation) => {
  const url = "/affectation";
  return await axios.post(url, affectation);
};

export const deleteAffectation = async (idAffectation) => {
  const url = `/affectation/${idAffectation}`;
  return await axios.delete(url);
};

export const UpdateAffectation = async (idAffectation, affectation) => {
  console.log("idAffectation axios", idAffectation, affectation);
  const url = `/affectation/${idAffectation}`;
  return await axios.put(url, affectation);
};
