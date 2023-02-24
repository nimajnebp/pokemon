import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { appRouter } from "./router";
import { store } from "./store/redux";
import "./styles/tailwind.css";
import "@fontsource/public-sans";

/** Main function. */
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <CssVarsProvider>
        <CssBaseline />
        <RouterProvider router={appRouter} />
      </CssVarsProvider>
    </Provider>
  </StrictMode>
);
