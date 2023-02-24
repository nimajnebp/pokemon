import { useState } from "react";
import { Card as JoyCard, Typography } from "@mui/joy";
import { Link, LinkProps } from "react-router-dom";
import { kebabToTitle } from "../../utils/string";
import PokemonBall from "../PokemonBall/PokemonBall";

/** Type defs. */
type CardProps = {
  name: string;
  to: LinkProps["to"];
  selected?: boolean | undefined;
};

/** Main function. */
function Card({ name, to, selected }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <JoyCard
      size="sm"
      component={Link}
      to={to}
      variant={isHovered ? "outlined" : "plain"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        textDecoration: "none",
        textAlign: "center",
        height: "100%",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "capitalize",
        gap: ".5rem",
      }}
    >
      {selected && <PokemonBall />}
      <Typography level="h5">{kebabToTitle(name)}</Typography>
    </JoyCard>
  );
}

/** Exports. */
export type { CardProps };
export default Card;
