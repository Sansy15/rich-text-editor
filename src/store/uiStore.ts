import { create } from 'zustand';

interface UIStore {
  isToolbarVisible: boolean;
  selectedFormat: string | null;
  isLoading: boolean;
  setToolbarVisible: (visible: boolean) => void;
  setSelectedFormat: (format: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isToolbarVisible: true,
  selectedFormat: null,
  isLoading: false,
  setToolbarVisible: (visible) => set({ isToolbarVisible: visible }),
  setSelectedFormat: (format) => set({ selectedFormat: format }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
