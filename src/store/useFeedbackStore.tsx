// src/store/useFeedbackStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Feedback = {
  post_id: number;
  feedback_desc: string;
  feedback_isSelected: boolean;
  created_at: string;
  post_detail: { post_title: string };
};

type FeedbackState = {
  feedbacks: Feedback[]; // 피드백 배열
  loading: boolean;
  error: string | null;
  setFeedbacks: (feedbacks: Feedback[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbacks: [],
      loading: false,
      error: null,
      setFeedbacks: (feedbacks: Feedback[]) => set({ feedbacks }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error })
    }),
    {
      name: 'feedbackStore'
    }
  )
);

export default useFeedbackStore;
