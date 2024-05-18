import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAffectation,
  deleteAffectation,
  getAllAffectation,
  getAffectationById,
  UpdateAffectation,
  getAllAvailableAffectation,
} from "../../APIs/api_affectation";

export const useGetAllAffectation = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allAffectation"],
    queryFn: getAllAffectation,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetAllAvailableAffectation = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allAvailableAffectation"],
    queryFn: getAllAvailableAffectation,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetAffectationById = ({
  onSuccess,
  onError,
  idAffectation,
} = {}) => {
  return useQuery({
    queryKey: ["AffectationById", idAffectation],
    queryFn: () => getAffectationById(idAffectation),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateAffectation = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAffectation,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allAffectation"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteAffectation = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAffectation,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allAffectation"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateAffectation = ({
  onSuccess = () => {},
  onError = () => {},
  idAffectation,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Affectation) => UpdateAffectation(idAffectation, Affectation),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allAffectation"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
