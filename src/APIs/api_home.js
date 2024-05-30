import axios from "axios";

export const getUpperCardInfo = async () => {
  // const url = "/marchesCommandes";
  const url = "/home/uppercardinfo";
  const { data } = await axios.get(url);
  return data || [];
};

export const getChartBarInfo = async () => {
  // const url = "/marchesCommandes";
  const url = "/home/machinecategorieinfo";
  const { data } = await axios.get(url);
  return data || [];
};

export const getPieInfo = async () => {
  // const url = "/marchesCommandes";
  const url = "/home/pieetatinfo";
  const { data } = await axios.get(url);
  return data || [];
};
