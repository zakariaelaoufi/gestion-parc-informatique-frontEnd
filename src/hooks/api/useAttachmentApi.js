import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAttachment,
  createOperationAttachment,
  deleteAttachment,
  getAllAttachment,
  getAttachmentById,
  getAttachmentByMarche,
  getAttachmentBySupplier,
} from "../../APIs/api_attachment";

export const useGetAllAttachment = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allAttachment"],
    queryFn: getAllAttachment,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetAttachmentById = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["attachmentById", id],
    queryFn: () => getAttachmentById(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetAttachmentByMarche = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["attachmentByMarche", id],
    queryFn: () => getAttachmentByMarche(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetAttachmentBySupplier = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["getAttachmentBySupplier", id],
    queryFn: () => getAttachmentBySupplier(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateAttachment = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttachment,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allAttachment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteAttachment = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allAttachment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

//---------------- operation Attachements ---------------------

export const useCreateOperationAttachment = ({
  onSuccess,
  onError,
  id,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (operation) => createOperationAttachment(id, operation),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["attachmentById", id] });
      queryClient.invalidateQueries({ queryKey: ["allAttachment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
