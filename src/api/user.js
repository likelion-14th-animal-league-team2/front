import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get("/member");
  return data.data; // { name, email, age, country }
};

export const updateMyProfile = async ({ age, country }) => {
  const { data } = await axiosInstance.patch("/member", { age, country });
  return data.data; // { name, email, age, country }
};
