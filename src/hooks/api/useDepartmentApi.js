import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UpdateDepartment,
  createDepartment,
  deleteDepartment,
  getAllDepartment,
} from "../../APIs/api_department";

export const useGetAllDepartment = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  return useQuery({
    queryKey: ["allDepartment"],
    queryFn: getAllDepartment,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateDepartment = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDepartment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateDepartment = ({
  onSuccess = () => {},
  onError = () => {},
  idDepartment = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Department) => UpdateDepartment(idDepartment, Department),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDepartment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteDepartment = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDepartment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
