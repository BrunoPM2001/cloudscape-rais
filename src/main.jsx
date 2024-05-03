import React from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider locale="es" messages={[messages]}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
