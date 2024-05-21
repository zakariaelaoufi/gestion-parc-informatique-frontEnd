import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAttachment,
  createOperationAttachment,
  deleteAttachment,
  getAllAttachment,
  getAllNotAvailableAttachment,
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
export const useGetAttachmentById = ({
  onSuccess,
  onError,
  idAttachment,
} = {}) => {
  return useQuery({
    queryKey: ["attachmentById", idAttachment],
    queryFn: () => getAttachmentById(idAttachment),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetAttachmentByMarche = ({
  onSuccess,
  onError,
  idAttachment,
} = {}) => {
  return useQuery({
    queryKey: ["attachmentByMarche", idAttachment],
    queryFn: () => getAttachmentByMarche(idAttachment),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetAttachmentBySupplier = ({
  onSuccess,
  onError,
  idAttachment,
} = {}) => {
  return useQuery({
    queryKey: ["getAttachmentBySupplier", idAttachment],
    queryFn: () => getAttachmentBySupplier(idAttachment),
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

export const useGetAllNotAvailableAttachment = ({
  onSuccess,
  onError,
} = {}) => {
  return useQuery({
    queryKey: ["allAvailableAttachment"],
    queryFn: getAllNotAvailableAttachment,
    onSuccess: () => {
      onSuccess && onSuccess();
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
  idAttachment,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (operation) =>
      createOperationAttachment(idAttachment, operation),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({
        queryKey: ["attachmentById", idAttachment],
      });
      queryClient.invalidateQueries({ queryKey: ["allAttachment"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
