import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { AddCharacterPayload, Character, Info } from "@/types/characters";

interface CharactersApiResponse {
  info?: Info;
  results: Character[];
  character?: Character;
}

const useCharacter = () => {
  const { data, error, mutate } = useSWR<CharactersApiResponse>(
    `/character`,
    fetcher,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );

  const addCharacter = (character: AddCharacterPayload) => {
    if (!data) return null;

    const newCharacter: Character = {
      id: Date.now(),
      created: Date.now().toString(),
      episode: [],
      location: {
        name: "Unknown",
        url: "",
      },
      origin: {
        name: "Unknown",
        url: "",
      },
      url: "",
      ...character,
    };

    mutate(
      { ...data, results: [newCharacter, ...data.results] },
      { revalidate: false }
    );
  };

  const editCharacter = (
    id: number,
    payload: { name: string; status: string }
  ) => {
    if (!data) return null;

    const newCharacters: Character[] = data.results.map((character) => {
      if (character.id !== id) {
        return character;
      }

      return { ...character, ...payload };
    });

    mutate({ ...data, results: newCharacters }, { revalidate: false });
  };

  const deleteCharacter = (id: number) => {
    if (!data) return null;
    const newCharacters = data.results.filter((c) => c.id !== id);
    mutate({ ...data, results: newCharacters }, { revalidate: false });
  };

  const setCharacter = (character: Character | null) => {
    mutate({ ...data, character }, { revalidate: false });
  };

  return {
    characters: data?.results ?? [],
    isError: error,
    isLoading: !data,
    deleteCharacter,
    addCharacter,
    editCharacter,
    setCharacter,
    currentCharacter: data?.character,
  };
};

export default useCharacter;
