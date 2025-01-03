import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@mantine/core/styles.css';
import '@fontsource/inter/index.css';
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter from react-router-dom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import { MantineProvider } from "@mantine/core";
import { theme } from "./lib/mantine/theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} withGlobalClasses withCssVariables>
            {/* <MantineProvider> */}
            <App />
          </MantineProvider>
        </QueryClientProvider>
      </NuqsAdapter>
    </BrowserRouter>
  </StrictMode>
);
