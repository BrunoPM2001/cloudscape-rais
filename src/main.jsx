import React from "react";
import ReactDOM from "react-dom/client";
import "@cloudscape-design/global-styles/index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gestion_grupos from "./pages/admin/estudios/gestion_grupos/detalle/index.jsx";
import Lineas_investigacion from "./pages/admin/admin/lineas/index.jsx";
import Usuarios_administrativos from "./pages/admin/admin/usuarios_administrativos/index.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <div>Login</div>,
  },
  {
    path: "admin",
    children: [
      {
        path: "estudios",
        children: [
          {
            path: "grupos",
            element: <Gestion_grupos />,
          },
          {
            path: "convocatorias",
            element: <div>convocatorias</div>,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "lineas",
            element: <Lineas_investigacion />,
          },
          {
            path: "usuarios_administrativos",
            element: <Usuarios_administrativos />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider locale="es" messages={[messages]}>
      <RouterProvider router={router} />
    </I18nProvider>
  </React.StrictMode>
);
