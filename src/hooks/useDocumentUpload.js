import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDocument } from "../api/resume";

export const useDocumentUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, type }) => uploadDocument(file, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
