export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export enum EpisodesSortBy {
  NONE = "none",
  NAME = "name",
  EPISODE = "episode",
}

export interface EditEpisodePayload {
  name: string;
  episode: string;
  air_date: string;
}
