import Typography from "@mui/joy/Typography";
import BackButton from "../BackButton/BackButton";

/** Main function. */
function QueryDataEmpty() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Typography level="h4">Ooops, nothing to see here...</Typography>
      <BackButton />
    </div>
  );
}

/** Exports. */
export default QueryDataEmpty;
