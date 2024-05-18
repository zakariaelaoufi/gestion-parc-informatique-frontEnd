import axios from "axios";

export const getAllArticle = async () => {
  const url = "/articles";
  const { data } = await axios.get(url);
  return data || [];
};

export const createArticle = async (article) => {
  const url = "/articles";
  return await axios.post(url, article);
};

export const deleteArticle = async (id) => {
  const url = `/articles/${id}`;
  // console.log(url);
  return await axios.delete(url);
};
