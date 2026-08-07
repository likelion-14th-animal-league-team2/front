import { useQuery } from "@tanstack/react-query";
import { getApplications, getApplicationStats } from "../api/application";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
};

export const useApplicationStats = () => {
  return useQuery({
    queryKey: ["applicationStats"],
    queryFn: getApplicationStats,
  });
};
