import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Page for create new note",
  openGraph: {
    title: "Create Note",
    description: "Page for create new note",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub app",
      },
    ],
  },
};

export default function CreateNote() {
  return <CreateNoteClient />;
}
