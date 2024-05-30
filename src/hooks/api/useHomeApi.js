import { useQuery } from "@tanstack/react-query";
import {
  getChartBarInfo,
  getPieInfo,
  getUpperCardInfo,
} from "../../APIs/api_home";

export const useGetUpperCardInfo = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["UpperCardInfo"],
    queryFn: getUpperCardInfo,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetChartInfo = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["ChartInfo"],
    queryFn: getChartBarInfo,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetPieInfo = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["PieInfo"],
    queryFn: getPieInfo,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
