import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { pokemonApi } from "../apis/pokemon/pokemon.api";
import { pokemonReducer } from "./slices/pokemon.slice";

/** Create store. */
const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

/** Typescript support. */
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/** Optional listeners. */
setupListeners(store.dispatch);

/** Exports. */
export type { RootState, AppDispatch };
export { store, useAppDispatch, useAppSelector };
