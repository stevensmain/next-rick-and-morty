"use client";

import { EpisodesTable } from "@/components/episodes/episodes-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEpisode from "@/hooks/useEpisodes";
import authStore from "@/store/auth";
import { Episode, EpisodesSortBy } from "@/types/episodes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Episodes() {
  const [sortingBy, setSortingBy] = useState<EpisodesSortBy>(
    EpisodesSortBy.NONE
  );
  const { episodes, isLoading } = useEpisode();
  const { user } = authStore();
  const router = useRouter();

  const handleSorting = (key: EpisodesSortBy) => {
    const newSortingValue = sortingBy === key ? EpisodesSortBy.NONE : key;
    setSortingBy(newSortingValue);
  };

  const sortedEpisodes = useMemo((): Episode[] => {
    if (sortingBy === EpisodesSortBy.NONE) return episodes;

    const compareProperties: Record<string, (episode: Episode) => any> = {
      [EpisodesSortBy.NAME]: (epi) => epi.name,
      [EpisodesSortBy.EPISODE]: (epi) => epi.episode,
    };

    return [...episodes].sort((a, b) => {
      const extractProperty = compareProperties[sortingBy];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [episodes, sortingBy]);

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
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Sort by:</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleSorting(EpisodesSortBy.NAME)}
              >
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSorting(EpisodesSortBy.EPISODE)}
              >
                Episode
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EpisodesTable episodes={sortedEpisodes} />
    </div>
  );
}
