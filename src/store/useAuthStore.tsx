import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  userId: string | null;
  setUserId: (userId: string) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  userType: string | null;
  setUserType: (userType: string) => void;
};

const useAuthStore = createStore(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({}),
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      userName: null,
      setUserName: (userName: string) => set({ userName: userName }),
      userType: null,
      setUserType: (userType: string) => set({ userType: userType })
    }),
    {
      name: 'loginInfoStore'
    }
  )
);

export default useAuthStore;
