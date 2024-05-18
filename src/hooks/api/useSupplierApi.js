import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSupplier,
  deleteSupplier,
  getAllSupplier,
  getSupplierById,
} from "../../APIs/api_supplier";

export const useGetAllSupplier = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allSupplier"],
    queryFn: getAllSupplier,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetSupplierById = ({ onSuccess, onError, id } = {}) => {
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

export const useCreateSupplier = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allSupplier"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteSupplier = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allSupplier"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
