/** Main function. */
function PokemonBall() {
  return (
    <div
      style={{
        display: "inline-block",
        width: 40,
        height: 40,
        backgroundImage:
          "radial-gradient(circle at center, white 0, white 4px, black 4px, black 7px, transparent 7px, transparent 100%), " +
          "linear-gradient(to bottom, red 0%, red 46%, black 46%, black 55%, white 55%, white 100%)",
        borderRadius: "9999px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          border: "3px solid black",
        }}
      />
    </div>
  );
}

/** Exports. */
export default PokemonBall;
