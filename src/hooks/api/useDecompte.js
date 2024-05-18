import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDecompte,
  createDecompteDefin,
  createOperationDecompte,
  deleteDecompte,
  getAllDecompte,
  getDecompteByAttachment,
  getDecompteById,
  getDecompteByMarcheId,
  getDecompteDefByMarcheId,
} from "../../APIs/api_decompte";

export const useGetAllDecompte = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allDecompte"],
    queryFn: getAllDecompte,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetDecompteById = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["decompteById", id],
    queryFn: () => getDecompteById(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetDecompteByAttachment = ({ onSuccess, onError, attachment } = {}) => {
  return useQuery({
    queryKey: ["decompteByAttachment", attachment],
    queryFn: () => getDecompteByAttachment(attachment),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
export const useGetDecompteByMarcheId = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["decompteByMarcheId", id],
    queryFn: () => getDecompteByMarcheId(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateDecompte = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDecompte,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDecompte"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteDecompte = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDecompte,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDecompte"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

//---------------- operation Attachements ---------------------

export const useCreateOperationDecompte = ({ onSuccess, onError, id } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (operation) => createOperationDecompte(id, operation),
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["decompteById", id] });
      queryClient.invalidateQueries({ queryKey: ["allDecompte"] });
    },
    onError: () => {
      onError && onError();
    },
  });

};

//--------------Decompte definitif--------------------//

export const useCreateDecompteDefinitif = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDecompteDefin,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allDecompteDef"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetDecompteDefByMarcheId = ({ onSuccess, onError, id } = {}) => {
  return useQuery({
    queryKey: ["decompteDefByMarcheId", id],
    queryFn: () => getDecompteDefByMarcheId(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
