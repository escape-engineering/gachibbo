import { create, createStore } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  loading: boolean; // 로딩
  setLoading: (loading: boolean) => void;
  error: string | null; // 에러
  login: () => void;
  logout: () => void;

  userId: string | null;
  setUserId: (userId: string) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  userEmail: string | null;
  setUserEmail: (userEmail: string) => void;
  userImg: string | null;
  setUserImg: (userImg: string) => void;
  userType: string | null;
  setUserType: (userType: string) => void;
  mentoWorkExperience: string | null;
  setMentoWorkExperience: (mentoWorkExperience: string) => void;
  mentoCurrent: boolean;
  setMentoCurrent: (mentoCurrent: boolean) => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      loading: false,
      setLoading: (loading: boolean) => set({ loading }),
      error: null,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: null, userName: null, userType: null }),
      userId: null,
      setUserId: (userId: string) => set({ userId: userId }),
      userName: null,
      setUserName: (userName: string) => set({ userName: userName }),
      userImg: null,
      setUserImg: (userImg: string) => set({ userImg: userImg }),
      userEmail: null,
      setUserEmail: (userEmail: string) => set({ userEmail: userEmail }),
      userType: null,
      setUserType: (userType: string) => set({ userType: userType }),
      mentoWorkExperience: null,
      setMentoWorkExperience: (mentoWorkExperience: string) => set({ mentoWorkExperience: mentoWorkExperience }),
      mentoCurrent: false,
      setMentoCurrent: (mentoCurrent: boolean) => set({ mentoCurrent })
    }),
    {
      name: 'loginInfoStore'
    }
  )
);

export default useAuthStore;
