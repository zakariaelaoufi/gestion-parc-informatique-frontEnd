import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UpdateTravaille,
  createTravaille,
  deleteTravaille,
  getAllTravaille,
  getTravailleById,
} from "../../APIs/api_travaille";

export const useGetAllTravaille = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allTravaille"],
    queryFn: getAllTravaille,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetTravailleById = ({ onSuccess, onError, idTravail } = {}) => {
  return useQuery({
    queryKey: ["travailleById", idTravail],
    queryFn: () => getTravailleById(idTravail),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateTravaille = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTravaille,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTravaille"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteTravaille = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTravaille,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTravaille"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateTravaille = ({
  onSuccess = () => {},
  onError = () => {},
  idUtilisateur = -1,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Utilisateur) => UpdateTravaille(idUtilisateur, Utilisateur),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUtilisateur"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
