import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import QueryLoading from "../QueryLoading/QueryLoading";
import QueryError from "../QueryError/QueryError";
import QueryDataEmpty from "../QueryDataEmpty/QueryDataEmpty";

/** Type defs. */
type QueryNonIdealStatesProps = {
  isFetching: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  data: any;
};

/** hook. */
function useQueryNonIdealStates({
  isFetching,
  isError,
  data,
}: Pick<QueryNonIdealStatesProps, "isFetching" | "isError" | "data">) {
  return (
    isFetching || isError || !data || (Array.isArray(data) && !data.length)
  );
}

/** Main function. */
function QueryNonIdealStates({
  isFetching,
  isError,
  error,
  data,
}: QueryNonIdealStatesProps) {
  if (isFetching) {
    return <QueryLoading />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  if (!data || (Array.isArray(data) && !data.length)) {
    return <QueryDataEmpty />;
  }

  return null;
}

/** Exports. */
export type { QueryNonIdealStatesProps };
export { useQueryNonIdealStates };
export default QueryNonIdealStates;
