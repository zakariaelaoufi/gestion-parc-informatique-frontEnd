import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInventaire,
  createMoreInventaire,
  deleteInventaire,
  getAllAvailableInventaire,
  getAllInventaire,
  getInventaireById,
  updateInventaire,
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

export const useAddMoreInventaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMoreInventaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allInventaire"] });
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
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

export const useUpdateInventaire = ({
  onSuccess = () => {},
  onError = () => {},
  idInventaire = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inventaire) => updateInventaire(idInventaire, inventaire),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allInventaire"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
