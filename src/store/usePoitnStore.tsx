import { createStore } from 'zustand/vanilla';

export type PointState = {
  points: number;
};

export type PointActions = {
  decrementPoint: () => void;
  incrementPoint: () => void;
};

export type PointStore = PointState & PointActions;

export const defaultInitState: PointState = {
  points: 0
};

export const createPointStore = (initState: PointState = defaultInitState) => {
  return createStore<PointStore>()((set) => ({
    ...initState,
    decrementPoint: () => set((state) => ({ points: state.points - 1 })),
    incrementPoint: () => set((state) => ({ points: state.points + 1 }))
  }));
};
