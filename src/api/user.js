import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get("/member");
  return data.data; // { name, email, age, country }
};
