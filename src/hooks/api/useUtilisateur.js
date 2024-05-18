import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createUtilisateur,
  deleteUtilisateur,
  UpdateUtilisateur,
  getAllUtilisateur,
  getUtilisateurById,
} from "../../APIs/api_utilisateur";

export const useGetAllUtilisateur = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  return useQuery({
    queryKey: ["allUtilisateur"],
    queryFn: getAllUtilisateur,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useCreateUtilisateur = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUtilisateur,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUtilisateur"] });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const useDeleteUtilisateur = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUtilisateur,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUtilisateur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useUpdateUtilisateur = ({
  onSuccess = () => {},
  onError = () => {},
  idUtilisateur = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Utilisateur) => UpdateUtilisateur(idUtilisateur, Utilisateur),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUtilisateur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetUtilisateurById = ({
  onSuccess,
  onError,
  idUtilisateur,
} = {}) => {
  return useQuery({
    queryKey: ["UtilisateurById", idUtilisateur],
    queryFn: () => getUtilisateurById(idUtilisateur),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
