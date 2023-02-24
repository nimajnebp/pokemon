import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import Divider from "@mui/joy/Divider";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import Autocomplete from "@mui/joy/Autocomplete";
import { useGetTypesQuery } from "../../apis/pokemon/pokemon.api";
import PokemonBall from "../../components/PokemonBall/PokemonBall";

/** Hook. */
function useHome() {
  const { pokemonType } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetTypesQuery();

  const autoCompleteOptions =
    data?.results?.map(({ name }) => ({
      label: name,
      id: name,
    })) || [];

  const selected =
    autoCompleteOptions.find((item) => item.id === pokemonType) || null;

  return { autoCompleteOptions, selected, isFetching, navigate };
}

/** Main function. */
function Home() {
  const { autoCompleteOptions, selected, isFetching, navigate } = useHome();

  return (
    <div className="flex flex-col h-screen min-h-screen max-h-screen">
      {/* Top-nav */}
      <div className="flex gap-4 items-center px-4 py-2">
        <Link
          to="/"
          className="inline-flex text-4xl items-center no-underline gap-2"
        >
          <PokemonBall />
          <Typography level="h4" fontWeight="bold">
            Pokemon
          </Typography>
        </Link>
      </div>
      <Divider orientation="horizontal" sx={{ margin: 0 }} />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left-sidebar */}
        <div className="p-4 w-1/5 min-w-[240px] space-y-4">
          <FormControl>
            <Autocomplete
              disabled={isFetching}
              endDecorator={isFetching && <CircularProgress size="sm" />}
              placeholder="Choose a type..."
              options={autoCompleteOptions}
              value={selected}
              onChange={(_, value) => {
                if (value) {
                  navigate(`/pokemon-type/${value?.label || ""}`);
                }
              }}
            />
          </FormControl>
        </div>
        <Divider orientation="vertical" />
        {/* Main content */}
        <div className="overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/** Exports. */
export { useHome };
export default Home;
