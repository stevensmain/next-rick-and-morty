export interface EditCharacterPayload {
  name: string;
  status: string;
  id: number;
}

export interface AddCharacterPayload {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export enum CharactersSortBy {
  NONE = "none",
  SPECIE = "specie",
  TYPE = "type",
  NAME = "name",
  GENDER = "gender",
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}
