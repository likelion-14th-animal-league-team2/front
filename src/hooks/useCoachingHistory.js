import { useQuery } from "@tanstack/react-query";
import { getCoachingHistory } from "../api/coaching";

export const useCoachingHistory = () => {
  return useQuery({
    queryKey: ["coachingHistory"],
    queryFn: getCoachingHistory,
  });
};
