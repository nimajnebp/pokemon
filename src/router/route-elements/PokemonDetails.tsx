import { useParams } from "react-router-dom";
import { useGetPokemonQuery } from "../../apis/pokemon/pokemon.api";
import QueryNonIdealStates, {
  useQueryNonIdealStates,
} from "../../components/QueryNonIdealStates/QueryNonIdealStates";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import BackButton from "../../components/BackButton/BackButton";

/** Hook. */
function usePokemonDetails() {
  const { pokemonId } = useParams();

  const { isFetching, isError, error, data } = useGetPokemonQuery(
    { id: pokemonId || "" },
    { skip: !pokemonId }
  );

  const stateIsNonIdeal = useQueryNonIdealStates({
    isFetching,
    isError,
    data,
  });

  const query = { isFetching, isError, error, data };

  return { stateIsNonIdeal, query };
}

/** Main function. */
function PokemonDetails() {
  const { stateIsNonIdeal, query } = usePokemonDetails();

  if (stateIsNonIdeal) {
    return <QueryNonIdealStates {...query} />;
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div>
        <BackButton />
      </div>
      <div className="flex items-center justify-center">
        <PokemonCard data={query.data} />
      </div>
    </div>
  );
}

/** Exports. */
export { usePokemonDetails };
export default PokemonDetails;
