import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFournisseur,
  deleteSupplier,
  getAllFournisseur,
  getSupplierById,
  updateFournisseur,
} from "../../APIs/api_fournisseur";

export const useGetAllFournisseur = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allFournisseur"],
    queryFn: getAllFournisseur,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetFournisseurById = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["supplierById", id],
    queryFn: () => getSupplierById(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateFournisseur = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFournisseur,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allFournisseur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteFournisseur = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allFournisseur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateFournisseur = ({
  onSuccess = () => {},
  onError = () => {},
  idFournisseur = -1,
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fournisseur) => updateFournisseur(idFournisseur, fournisseur),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allFournisseur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
