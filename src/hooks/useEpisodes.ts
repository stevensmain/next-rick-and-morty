import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Info } from "@/types/characters";
import { EditEpisodePayload, Episode } from "@/types/episodes";

interface EpisodeApiResponse {
  info?: Info;
  results: Episode[];
  currentEpisode?: Episode;
}

const useEpisode = () => {
  const { data, error, mutate } = useSWR<EpisodeApiResponse>(
    "/episode",
    fetcher,
    { revalidateIfStale: false, refreshWhenHidden: false }
  );

  const deleteEpisode = (id: number) => {
    if (!data) return null;
    const newEpisodes = data.results.filter((c) => c.id !== id);
    mutate({ ...data, results: newEpisodes }, { revalidate: false });
  };

  const setEpisode = (episode: Episode | null) => {
    mutate({ ...data, currentEpisode: episode }, { revalidate: false });
  };

  const editEpisode = (id: number, payload: EditEpisodePayload) => {
    if (!data) return null;

    const newEps: Episode[] = data.results.map((ep) => {
      if (ep.id !== id) {
        return ep;
      }

      return { ...ep, ...payload };
    });

    mutate({ ...data, results: newEps }, { revalidate: false });
  };

  return {
    episodes: data?.results ?? [],
    isError: error,
    isLoading: !data,
    deleteEpisode,
    editEpisode,
    setEpisode,
    currentEpisode: data?.currentEpisode,
  };
};

export default useEpisode;
