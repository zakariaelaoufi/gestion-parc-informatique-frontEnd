import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createArticle, deleteArticle, getAllArticle } from "../../APIs/api_article";



  export const useGetAllArticle = ({ onSuccess, onError } = {}) =>{
    return  useQuery({
        queryKey: ["allArticle"],
        queryFn: getAllArticle,
        onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
      });
}
 
export const useCreateArticle = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allArticle"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteArticle = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allArticle"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};


