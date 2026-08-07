import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../api/resume";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });
};
