import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMarque,
  deleteMarque,
  getAllMarque,
  getMarqueById,
  updateMarque,
} from "../../APIs/api_marque";

export const useGetAllMarque = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allMarque"],
    queryFn: getAllMarque,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetMarqueById = ({ onSuccess, onError, idMarque } = {}) => {
  return useQuery({
    queryKey: ["MarqueById", idMarque],
    queryFn: () => getMarqueById(idMarque),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateMarque = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMarque,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allMarque"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteMarque = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMarque,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allMarque"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateMarque = ({ onSuccess, onError, idMarque = -1 } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (marque) => updateMarque(idMarque, marque),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allMarque"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
