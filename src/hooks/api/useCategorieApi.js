import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategorie,
  deleteCategorie,
  getAllCategorie,
  getCategorieById,
  updateCategorie,
} from "../../APIs/api_categorie";

export const useGetAllCategorie = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allCategorie"],
    queryFn: getAllCategorie,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetCategorieById = ({
  onSuccess,
  onError,
  idCategorie,
} = {}) => {
  return useQuery({
    queryKey: ["CategorieById", idCategorie],
    queryFn: () => getCategorieById(idCategorie),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateCategorie = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategorie,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCategorie"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteCategorie = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategorie,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCategorie"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateCategorie = ({
  onSuccess,
  onError,
  idCategorie = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categorie) => updateCategorie(idCategorie, categorie),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCategorie"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
