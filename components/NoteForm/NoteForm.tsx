"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNotePayLoad } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useNoteDraft } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const draftStore = useNoteDraft();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayLoad) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      draftStore.clearDraft();
      onCancel();
    },
  });

  const formAction = (formData: FormData) => {
    const payload: CreateNotePayLoad = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as CreateNotePayLoad["tag"],
    };

    mutation.mutate(payload);
  };

  const handeleChange = ({
    target: { value, name },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    draftStore.setDraft({ [name]: value });
  };

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          className={css.input}
          value={draftStore.draft.title}
          onChange={handeleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          value={draftStore.draft.content}
          onChange={handeleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draftStore.draft.tag}
          onChange={handeleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={onCancel} className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
