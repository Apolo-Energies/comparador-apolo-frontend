import { create } from 'zustand';

interface ReloadStore {
  reloadFlag: boolean;
  triggerReload: () => void;
}

export const useReloadStore = create<ReloadStore>((set) => ({
  reloadFlag: false,
  triggerReload: () => set((state) => ({ reloadFlag: !state.reloadFlag })),
}));
