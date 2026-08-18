import axiosInstance from "./axiosInstance";

export const completeProfile = async ({ age, country }) => {
  const { data } = await axiosInstance.patch("/member/complete-profile", {
    age,
    country,
  });
  return data;
};
