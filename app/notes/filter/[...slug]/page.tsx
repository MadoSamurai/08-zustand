import { fetchNotes, PER_PAGE } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? "All notes" : slug?.[0] || "All notes";

  return {
    title: `Note - ${tag}`,
    description: "Note list",
    openGraph: {
      title: `Note - ${tag}`,
      description: "Note list",
      url: `https://08-zustand-zeta-mauve.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub note list",
        },
      ],
    },
  };
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? "" : slug?.[0] || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </>
  );
}
