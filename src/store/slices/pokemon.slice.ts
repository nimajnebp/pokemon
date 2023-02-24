import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../apis/pokemon/pokemon.types";
import { RootState } from "../redux";

/** Create entity adapter. */
const pokemonAdapter = createEntityAdapter<Pokemon>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// eslint-disable-next-line @typescript-eslint/unbound-method
const { addOne, removeOne, getInitialState, getSelectors } = pokemonAdapter;

/** Selectors. */
const { selectById: selectPokemonById, selectIds: selectPokemonIds } =
  getSelectors<RootState>((state) => state.pokemons);

/** Create slice. */
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: getInitialState(),
  reducers: {
    catchOne: addOne,
    releaseOne: removeOne,
  },
});

/** Actions. */
const { catchOne, releaseOne } = pokemonSlice.actions;

/** Reducer. */
const pokemonReducer = pokemonSlice.reducer;

/** Exports. */
export {
  pokemonReducer,
  selectPokemonById,
  selectPokemonIds,
  catchOne,
  releaseOne,
};
