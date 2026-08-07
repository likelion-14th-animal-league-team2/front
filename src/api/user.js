import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data; // { name, email, membership, age, country, avatarUrl }
};
