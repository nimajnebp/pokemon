import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as types from "./pokemon.types";

/** Constants. */
const baseUrl = "https://pokeapi.co/api/v2/";

/** pokemonApi */
const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 600, // 10 minutes (Cache time for fetched data, once it's not used by the app.)
  endpoints: (builder) => ({
    getTypes: builder.query<types.GetTypesQueryResult, void>({
      query: () => `/type`,
    }),
    getType: builder.query<types.GetTypeQueryResult, types.GetTypeQueryArgs>({
      query: ({ name }) => `/type/${name}`,
    }),
    getPokemon: builder.query<
      types.GetPokemonQueryResult,
      types.GetPokemonQueryArgs
    >({ query: ({ id }) => `/pokemon/${id}` }),
  }),
});

/** Exports. */
export { pokemonApi };
export const { useGetTypesQuery, useGetTypeQuery, useGetPokemonQuery } =
  pokemonApi;
