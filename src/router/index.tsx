import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "./route-elements/NotFound";
import Home from "./route-elements/Home";
import PokemonList from "./route-elements/PokemonList";
import PokemonDetails from "./route-elements/PokemonDetails";
import HomeIndex from "./route-elements/HomeIndex";

/** Router. */
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<HomeIndex />} />
      <Route path="*" element={<NotFound />} />
      <Route path="pokemon-type/:pokemonType" element={<PokemonList />} />
      <Route path="pokemon/:pokemonId" element={<PokemonDetails />} />
    </Route>
  )
);

/** Exports. */
export { appRouter };
