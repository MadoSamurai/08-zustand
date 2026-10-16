import { Note, NoteTag } from "@/types/note";
import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
export const PER_PAGE = 12;
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}
export interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
}
export interface CreateNotePayLoad {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params?: FetchNotesParams,
): Promise<FetchNoteResponse> => {
  const queryParams = { ...params };
  if (queryParams.tag === "all" || !queryParams.tag) {
    delete queryParams.tag;
  }
  const { data } = await axiosApi.get<FetchNoteResponse>("/notes", {
    params: queryParams,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosApi.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: CreateNotePayLoad): Promise<Note> => {
  const { data } = await axiosApi.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosApi.delete<Note>(`/notes/${id}`);
  return data;
};
