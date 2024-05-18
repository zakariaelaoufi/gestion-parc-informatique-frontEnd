import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInventaire,
  deleteInventaire,
  getAllAvailableInventaire,
  getAllInventaire,
  getInventaireById,
} from "../../APIs/api_inventaire";
("../../APIs/api_fournisseur");

export const useGetAllInventaire = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allInventaire"],
    queryFn: getAllInventaire,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetAllAvailableInventaire = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allInventaire"],
    queryFn: getAllAvailableInventaire,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetInventaireById = ({
  onSuccess,
  onError,
  idInventaire,
} = {}) => {
  return useQuery({
    queryKey: ["InventaireById", idInventaire],
    queryFn: () => getInventaireById(idInventaire),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateInventaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allInventaire"] });
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteInventaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInventaire,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allInventaire"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};