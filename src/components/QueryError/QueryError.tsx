import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert } from "@mui/joy";

/** Type defs. */
type QueryErrorProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
};

/** Main function. */
function QueryError({ error }: QueryErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert color="danger" variant="soft" className="m-4">
      <div className="space-y-2">
        <div className="text-xl">Error</div>
        <div>
          {Object.keys(error).map((item) => (
            <div key={item}>
              <span className="mr-2 text-md">{item}:</span>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <span>{error[item]}</span>
            </div>
          ))}
        </div>
      </div>
    </Alert>
  );
}

/** Exports. */
export type { QueryErrorProps };
export default QueryError;
