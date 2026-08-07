import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/user";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });
};
