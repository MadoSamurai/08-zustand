import { NoteTag } from "@/types/note";
import { CreateNotePayLoad } from "../api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: CreateNotePayLoad = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

interface NoteDraftStore {
  draft: CreateNotePayLoad;
  setDraft: (noteDraftData: Partial<CreateNotePayLoad>) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (noteDraftData) => {
        return set((prevState) => ({
          draft: { ...prevState.draft, ...noteDraftData },
        }));
      },
      clearDraft: () => {
        return set({ draft: initialDraft });
      },
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
