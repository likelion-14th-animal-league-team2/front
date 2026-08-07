import { create } from "zustand";

export const useAuthStore = create(() => ({
  // TODO: 백엔드 로그인 API 연동되면 실제 토큰으로 교체
  login: () => {
    localStorage.setItem("accessToken", "demo-token");
  },
  logout: () => {
    localStorage.removeItem("accessToken");
  },
}));
