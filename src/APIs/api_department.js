import axios from "axios";

export const getAllDepartment = async () => {
  const url = "/departement";
  const { data } = await axios.get(url);
  return data || [];
};

export const createDepartment = async (department) => {
  const url = "/departement";
  return await axios.post(url, department);
};

export const deleteDepartment = async (idDepartment) => {
  const url = `/departement/${idDepartment}`;
  return await axios.delete(url);
};

export const UpdateDepartment = async (idDepartment, department) => {
  const url = `/departement/${idDepartment}`;
  return await axios.post(url, department);
};
