import EditorSearch from "@/components/modules/editor/search";
import React from "react";

export default async function Home(props: {
  params: { slug: string };
  searchParams: { term: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10 px-24">
      <h1 className="font-bold text-2xl">Search Anime</h1>
      <EditorSearch />
    </main>
  );
}
