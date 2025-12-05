import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserContextInterface, LoginResponse } from "./interfaces";

export const useAuth = create(
  persist<UserContextInterface>(
    (set, get) => ({
      authenticated: false,
      userInfo: null,
      loginUser: (data: LoginResponse) => {
        set((state) => ({ userInfo: data, authenticated: true }));
      },
      logoutUser: () => {
        set((state) => ({ userInfo: null, authenticated: false }));
      },
    }),
    {
      name: "userInfo",
    }
  )
);
