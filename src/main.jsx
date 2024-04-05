import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@cloudscape-design/global-styles/index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider locale="es" messages={[messages]}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
