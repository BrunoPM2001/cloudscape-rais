import React from "react";
import ReactDOM from "react-dom/client";
import "@cloudscape-design/global-styles/index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gestion_grupos from "./pages/admin/estudios/gestion_grupos/index.jsx";
import Lineas_investigacion from "./pages/admin/admin/lineas/index.jsx";
import Usuarios_administrativos from "./pages/admin/admin/usuarios_administrativos/index.jsx";
import Usuarios_investigadores from "./pages/admin/admin/usuarios_investigadores/index.jsx";
import Detalle_grupo from "./pages/admin/estudios/gestion_grupos/detalle/index.jsx";
import Gestion_proyectos_grupos from "./pages/admin/estudios/gestion_proyectos_grupos/index.jsx";
import Detalle_proyecto_grupo from "./pages/admin/estudios/gestion_proyectos_grupos/detalle/index.jsx";
import Gestion_proyectos_fex from "./pages/admin/estudios/gestion_proyectos_fex/index.jsx";

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
            path: "convocatorias",
            element: <div>convocatorias</div>,
          },
          {
            path: "grupos",
            children: [
              {
                path: "",
                element: <Gestion_grupos />,
              },
              {
                path: "detalle",
                element: <Detalle_grupo />,
              },
            ],
          },
          {
            path: "proyectos_grupos",
            children: [
              {
                path: "",
                element: <Gestion_proyectos_grupos />,
              },
              {
                path: "detalle",
                element: <Detalle_proyecto_grupo />,
              },
            ],
          },
          {
            path: "proyectos_fex",
            element: <Gestion_proyectos_fex />,
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
          {
            path: "usuarios_investigadores",
            element: <Usuarios_investigadores />,
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
