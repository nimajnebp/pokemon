import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Tooltip from "@mui/joy/Tooltip";
import Switch from "@mui/joy/Switch";
import Chip from "@mui/joy/Chip";
import { useGetTypeQuery } from "../../apis/pokemon/pokemon.api";
import Card from "../../components/Card/Card";
import { getPokemonIdFromUrl, kebabToTitle } from "../../utils/string";
import { NamedAPIResource } from "../../apis/pokemon/pokemon.types";
import QueryNonIdealStates, {
  useQueryNonIdealStates,
} from "../../components/QueryNonIdealStates/QueryNonIdealStates";
import { useAppSelector } from "../../store/redux";
import { selectPokemonIds } from "../../store/slices/pokemon.slice";

/** Hooks. */
function usePokemonList() {
  const { pokemonType } = useParams();
  const selectedPokemonIds = useAppSelector((state) => selectPokemonIds(state));
  const selectedPokemonIdsSet = new Set(selectedPokemonIds);

  const { data, isError, error, isFetching } = useGetTypeQuery(
    { name: pokemonType || "" },
    { skip: !pokemonType }
  );

  const extendedPokemons = data?.pokemon.map((item) => {
    return {
      ...item,
      selected: selectedPokemonIdsSet.has(
        Number(getPokemonIdFromUrl(item.pokemon.url)) || ""
      ),
    };
  });

  return { pokemonType, data: extendedPokemons, isError, error, isFetching };
}

function useSearchInput(
  data: { pokemon: NamedAPIResource; selected: boolean }[] | undefined
) {
  const [inputValue, setInputValue] = useState("");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const toggleSelectedOnly = () => setSelectedOnly((prev) => !prev);
  const resetInput = () => setInputValue("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredData =
    data
      ?.filter((item) => item.pokemon.name.toLowerCase().includes(inputValue))
      .filter((item) => (selectedOnly ? item.selected : true)) || [];

  return {
    inputValue,
    handleInputChange,
    resetInput,
    filteredData,
    selectedOnly,
    toggleSelectedOnly,
  };
}

/** Main function. */
function PokemonList() {
  const { data, isError, error, isFetching, pokemonType } = usePokemonList();
  const {
    inputValue,
    resetInput,
    handleInputChange,
    filteredData,
    selectedOnly,
    toggleSelectedOnly,
  } = useSearchInput(data);

  const stateIsNonIdeal = useQueryNonIdealStates({ isFetching, isError, data });
  const states = { isFetching, isError, error, data };
  if (stateIsNonIdeal) {
    return <QueryNonIdealStates {...states} />;
  }

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <div className="p-4 flex gap-4 flex-wrap items-center">
          <Input
            placeholder="Search for a Pokemon..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Divider orientation="vertical" />
          <Tooltip title={selectedOnly ? "All Pokemons" : "Your Pokemons"}>
            <Switch checked={selectedOnly} onChange={toggleSelectedOnly} />
          </Tooltip>
          <Divider orientation="vertical" />
          <Chip
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "large",
            }}
          >
            {kebabToTitle(pokemonType)}
          </Chip>
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="p-4">
        {!filteredData.length && (
          <div className="h-full w-full grid items-center justify-center gap-4">
            {inputValue && (
              <>
                <Typography level="h3">{`No result for search key: "${inputValue}"`}</Typography>
                <div className="flex justify-center">
                  <Button size="lg" onClick={resetInput}>
                    Reset
                  </Button>
                </div>
              </>
            )}
            {!inputValue && (
              <>
                <Typography level="h3">{`You dont have any Pokemon yet.`}</Typography>
                <div className="flex justify-center">
                  <Button size="lg" onClick={toggleSelectedOnly}>
                    Reset
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        {!!filteredData.length && (
          <ul className="list-none p-0 m-0 grid gap-4 grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))]">
            {filteredData.map(({ pokemon: { name, url }, selected }) => (
              <li key={name}>
                <Card
                  name={name}
                  to={`/pokemon/${getPokemonIdFromUrl(url) || ""}`}
                  selected={selected}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Exports. */
export { usePokemonList };
export default PokemonList;
