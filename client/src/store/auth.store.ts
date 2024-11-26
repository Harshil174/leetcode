import { create } from "zustand";

type AuthState = {
  user: any;
  token: string | null;
};

type AuthActions = {
  setAuth: (token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((_) => ({
  user: null,
  token: null,

  setAuth: (token: string) => localStorage.setItem("auth-token", token),
  clearAuth: () => localStorage.removeItem("auth-token"),
}));
