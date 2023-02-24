import { Fragment } from "react";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Button";
import { Pokemon } from "../../apis/pokemon/pokemon.types";
import { useAppDispatch, useAppSelector } from "../../store/redux";
import {
  catchOne,
  releaseOne,
  selectPokemonById,
} from "../../store/slices/pokemon.slice";
import PokemonBall from "../PokemonBall/PokemonBall";

/** Type defs. */
type PokemonCardProps = {
  data: Pokemon | undefined;
};

/** Main function. */
function PokemonCard({ data }: PokemonCardProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    selectPokemonById(state, data?.id || "")
  );

  const handleToggle = () => {
    if (isSelected) {
      dispatch(releaseOne(isSelected.id));
    }
    if (!isSelected && data) {
      dispatch(catchOne(data));
    }
  };

  if (!data) {
    return null;
  }

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 500, width: "100%", position: "relative" }}
    >
      <CardOverflow>
        <AspectRatio ratio="1.5">
          <img
            style={{ objectFit: "contain" }}
            src={data.sprites.other["official-artwork"].front_default}
            loading="lazy"
            alt={data.name}
          />
        </AspectRatio>
      </CardOverflow>
      <div className="flex gap-2">
        <div className="flex-1">
          <Typography
            level="h3"
            fontWeight="bold"
            sx={{ textTransform: "capitalize", mt: 2 }}
          >
            {data.name}
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
            {`Weight: ${data.weight || ""} | Height: ${data.height || ""}`}
          </Typography>
        </div>
        <div className="flex items-center">
          <Button
            onClick={handleToggle}
            color={isSelected ? "danger" : "success"}
          >
            {isSelected ? "Release" : "Catch"}
          </Button>
          {isSelected && (
            <div className="absolute right-4 top-4 z-10">
              <PokemonBall />
            </div>
          )}
        </div>
      </div>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          paddingY: "1rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {data.abilities.map(
          ({ ability, is_hidden }, index) =>
            !is_hidden && (
              <Fragment key={ability.name}>
                {index !== 0 && <Divider orientation="vertical" />}
                <Chip
                  variant="solid"
                  sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                >
                  {ability.name}
                </Chip>
              </Fragment>
            )
        )}
      </CardOverflow>
    </Card>
  );
}

/** Exports. */
export type { PokemonCardProps };
export default PokemonCard;
