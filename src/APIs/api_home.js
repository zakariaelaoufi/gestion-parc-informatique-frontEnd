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

export const getMachineCountDepartment = async () => {
  // const url = "/marchesCommandes";
  const url = "/home/machine-count-department";
  const { data } = await axios.get(url);
  return data || [];
};

export const getTop5Actif = async () => {
  // const url = "/marchesCommandes";
  const url = "/home/top5actif";
  const { data } = await axios.get(url);
  return data || [];
};
