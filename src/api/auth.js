import axiosInstance from "./axiosInstance";

export const completeProfile = async ({ age, country }) => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await axiosInstance.patch(
    "/member/complete-profile",
    { age, country },
    { params: { accessToken } }
  );
  return data;
};

export const kakaoLogin = async (code) => {
  const { data } = await axiosInstance.get("/auth/kakao/callback", {
    params: { code },
  });
  return data;
};
