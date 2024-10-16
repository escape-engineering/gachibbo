import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Interview = {
  user_uuid: string;
  tech_session_create_at: string;
  total_tech_questions: number;
  tech_score: number;
};

type InterviewState = {
  interviews: Interview[];
  loading: boolean;
  error: string | null;
  setInterviews: (interviews: Interview[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const useInterviewStore = create<InterviewState>((set) => ({
  interviews: [],
  loading: false,
  error: null,
  setInterviews: (interviews) => set({ interviews }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));

export default useInterviewStore;
