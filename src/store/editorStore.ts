import { create } from 'zustand';

interface EditorStore {
  editorState: any | null;
  setEditorState: (state: any) => void;
  clearEditorState: () => void;
  serializeEditorState: () => string | null;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  editorState: null,
  setEditorState: (state) => set({ editorState: state }),
  clearEditorState: () => set({ editorState: null }),
  serializeEditorState: () => {
    const state = get().editorState;
    return state ? JSON.stringify(state) : null;
  },
}));
