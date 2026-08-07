import { create } from "zustand";

export const useAuthStore = create(() => ({
  logout: () => {
    localStorage.removeItem("accessToken");
  },
}));
