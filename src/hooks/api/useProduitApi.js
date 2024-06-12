import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMoreInventaireLV,
  createProduit,
  deleteProduit,
  downloadImage,
  getAllProduit,
  getProduitById,
  updateProduit,
  uploadImage,
} from "../../APIs/api_produit";
("../../APIs/api_fournisseur");

export const useGetAllProduit = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allProduit"],
    queryFn: getAllProduit,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetProduitById = ({ onSuccess, onError, idProduit } = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["ProduitById", idProduit],
    queryFn: () => getProduitById(idProduit),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateProduit = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useAddMoreInventaireLV = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMoreInventaireLV,
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

export const useUpdateProduit = ({ onSuccess, onError, idProduit } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateProduit(formData, idProduit),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteProduit = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduit,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUploadimage = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDownloadimage = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: downloadImage,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProduit"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
