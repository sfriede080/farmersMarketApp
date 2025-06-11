import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-vndmogggzut30im0.us.auth0.com"
      clientId="g8ekPALYesAaTyFohmRhoqvw1N9N9oWK"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-vndmogggzut30im0.us.auth0.com/api/v2/",
        scope: "openid profile email",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
