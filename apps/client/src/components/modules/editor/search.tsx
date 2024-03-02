"use client";
import { anilist } from "@/api/anilist";
import { Input } from "@acme/components/react";
import { observable } from "@legendapp/state";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { reactive } from "@legendapp/state/react";
import { Media } from "anilist";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

interface SearchObservableProps {
  term: string;
  results: Array<Partial<Media>>;
  isSearching: boolean;
}

enableReactComponents();

async function queryAnimeByTerm(term: string) {
  const queryByName = anilist.query
    .media(term)
    .withTitles()
    .withId()
    .withCoverImage();

  const query = anilist.query.page().withMedia(queryByName);

  if (term.length === 0) return search.results.set([]);

  try {
    const { media: results } = await query.fetch();

    if (results.length >= 1) {
      search.results.set(results);
      search.isSearching.set(false);

      return;
    }

    search.results.set([]);
    search.isSearching.set(false);

    return;
  } catch (err) {
    console.error((err as Error).message);
  }
}

const search = observable<SearchObservableProps>({
  term: "",
  results: [],
  isSearching: false,
});

const ReactiveInput = reactive(Input);

const EditorSearch: React.FC = () => {
  const { results, isSearching, term } = search.get();
  const [debounceSearchTerm] = useDebounceValue<string>(term, 500);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputTerm = event.target.value;

    search.term.set(inputTerm);

    if (inputTerm.length < 1) {
      search.results.set([]);
      search.isSearching.set(false);
      return;
    }

    search.isSearching.set(true);
  };

  useEffect(() => {
    if (debounceSearchTerm.length >= 3) {
      queryAnimeByTerm(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  return (
    <div className="flex flex-col gap-3">
      <ReactiveInput $value={search.term} onChange={handleInputChange} />
      <ul>
        {isSearching && <p>Searching...</p>}
        <p>term: {term}</p>
        {!isSearching &&
          results.map((anime) => (
            <li key={anime.id} className="flex flex-col">
              <h1>{anime.title?.romaji}</h1>
              <figure className="w-56 h-80 relative">
                <Image
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(max-width: 768px) 215px, (max-width: 1200px) 215px"
                  src={anime.coverImage?.extraLarge as string}
                  alt={anime.title?.romaji as string}
                />
              </figure>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EditorSearch;
