import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../api/application";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
};
