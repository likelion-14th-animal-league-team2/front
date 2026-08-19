import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoachingHistory, removeCoachingHistory } from "../api/coaching";

export const useCoachingHistory = () => {
  return useQuery({
    queryKey: ["coachingHistory"],
    queryFn: getCoachingHistory,
  });
};

export const useDeleteCoachingHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCoachingHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coachingHistory"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
