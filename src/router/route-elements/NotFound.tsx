import { Navigate } from "react-router-dom";

/** Main function. */
function NotFound() {
  // If route is not a match, navigate one level closer to root,
  // this way there is technically no scenario for a 404.
  return <Navigate to=".." replace />;
}

/** Exports. */
export default NotFound;
