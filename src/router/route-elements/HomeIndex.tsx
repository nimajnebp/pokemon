import { useGetTypesQuery } from "../../apis/pokemon/pokemon.api";
import QueryNonIdealStates, {
  useQueryNonIdealStates,
} from "../../components/QueryNonIdealStates/QueryNonIdealStates";
import Card from "../../components/Card/Card";

/** Hook. */
function useHomeIndex() {
  const { data, isError, error, isFetching } = useGetTypesQuery();

  const stateIsNonIdeal = useQueryNonIdealStates({
    isFetching,
    isError,
    data,
  });

  const query = { isFetching, isError, error, data };

  return { stateIsNonIdeal, query };
}

/** Main function. */
function HomeIndex() {
  const { stateIsNonIdeal, query } = useHomeIndex();

  if (stateIsNonIdeal) {
    return <QueryNonIdealStates {...query} />;
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] p-4">
      {query.data?.results?.map(({ name }) => (
        <Card key={name} name={name} to={`/pokemon-type/${name}`} />
      ))}
    </div>
  );
}

/** Exports. */
export { useHomeIndex };
export default HomeIndex;
