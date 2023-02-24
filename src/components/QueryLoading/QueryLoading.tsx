import { CircularProgress } from "@mui/joy";

/** Main function. */
function QueryLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}

/** Exports. */
export default QueryLoading;
