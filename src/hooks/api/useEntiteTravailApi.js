import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEntiteTravail,
  deleteEntiteTravail,
  getAllEntiteTravail,
  getEntiteTravailById,
  updateEntiteTravail,
} from "../../APIs/api_entitetravail";

export const useGetAllEntiteTravail = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  return useQuery({
    queryKey: ["allEntiteTravail"],
    queryFn: getAllEntiteTravail,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetEntiteTravailById = ({
  onSuccess,
  onError,
  idEntiteTravail,
} = {}) => {
  return useQuery({
    queryKey: ["EntiteTravailById", idEntiteTravail],
    queryFn: () => getEntiteTravailById(idEntiteTravail),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateEntiteTravail = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEntiteTravail,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allEntiteTravail"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateEntiteTravail = ({
  onSuccess = () => {},
  onError = () => {},
  idEntiteTravail = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entitetravail) =>
      updateEntiteTravail(idEntiteTravail, entitetravail),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allEntiteTravail"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteEntiteTravail = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEntiteTravail,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allEntiteTravail"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
