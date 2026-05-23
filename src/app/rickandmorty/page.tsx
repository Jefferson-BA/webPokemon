import { APIResponse } from "@/types/rickandmorty";
import CharacterListClient from "./components/CharacterListClient";

async function getInitialCharacters() {
  // cache: 'force-cache' fuerza comportamiento SSG estático total
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Error al sincronizar con la Ciudadela");

  const data: APIResponse = await res.json();
  return data.results;
}

export default async function RickAndMortyPage() {
  const initialCharacters = await getInitialCharacters();

  return <CharacterListClient initialCharacters={initialCharacters} />;
}