/** Poke api models. */
export type NamedAPIResource = {
  name: string;
  url: string;
};

export type Ability = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  id: string;
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

/** Api endpoint Result/Args types. */
export type GetTypesQueryResult = {
  count: number | null;
  next: number | null;
  previous: number | null;
  results: NamedAPIResource[] | null;
};

export type GetTypeQueryResult = {
  pokemon: { pokemon: NamedAPIResource }[];
};

export type GetTypeQueryArgs = {
  name: string;
};

export type GetPokemonQueryArgs = {
  id: string;
};

export type GetPokemonQueryResult = Pokemon;
