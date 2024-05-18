import axios from "axios";

export const getAllUser = async () => {
  const url = "/users";
  const { data } = await axios.get(url);
  return data || [];
};

export const createUser = async (user) => {
  const url = "/users";
  return await axios.post(url, user);
};

export const deleteUser = async (id) => {
  const url = `/users/${id}`;
  return await axios.delete(url);
};