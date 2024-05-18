import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMarche,
  deleteMarche,
  getAllMarche,
  getMarcheById,
  getMarcheBySupplier,
} from "../../APIs/api_marche";

export const useGetAllMarche = ({ onSuccess, onError } = {}) => {

  return useQuery({
    queryKey: ["allMarche"],
    queryFn: getAllMarche,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetMarcheById = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["marcheById", id],
    queryFn: () => getMarcheById(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetMarcheBySupplier = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["marcheBySupplier", id],
    queryFn: () => getMarcheBySupplier(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateMarche = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMarche,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allMarche"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteMarche = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMarche,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allMarche"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
