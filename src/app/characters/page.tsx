"use client";

import { AddCharacterDialog } from "@/components/characters/add-character-dialog";
import { CharactersTable } from "@/components/characters/characters-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCharacter from "@/hooks/useCharacter";
import authStore from "@/store/auth";
import { Character, CharactersSortBy } from "@/types/characters";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [sortingBy, setSortingBy] = useState<CharactersSortBy>(
    CharactersSortBy.NONE
  );
  const { characters, isLoading } = useCharacter();
  const { user } = authStore();
  const router = useRouter();

  const handleSorting = (key: CharactersSortBy) => {
    const newSortingValue = sortingBy === key ? CharactersSortBy.NONE : key;
    setSortingBy(newSortingValue);
  };

  const sortedCharacters = useMemo((): Character[] => {
    if (sortingBy === CharactersSortBy.NONE) return characters;

    const compareProperties: Record<string, (character: Character) => any> = {
      [CharactersSortBy.NAME]: (char) => char.location.name,
      [CharactersSortBy.SPECIE]: (char) => char.species,
      [CharactersSortBy.TYPE]: (char) => char.type,
      [CharactersSortBy.GENDER]: (char) => char.gender,
    };

    return [...characters].sort((a, b) => {
      const extractProperty = compareProperties[sortingBy];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [characters, sortingBy]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end gap-3 mb-3">
        <AddCharacterDialog />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary">Sort by:</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleSorting(CharactersSortBy.NAME)}
              >
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSorting(CharactersSortBy.GENDER)}
              >
                Gender
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSorting(CharactersSortBy.SPECIE)}
              >
                Specie
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSorting(CharactersSortBy.TYPE)}
              >
                Type
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CharactersTable characters={sortedCharacters} />
    </div>
  );
}
