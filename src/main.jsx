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
import Detalle_grupo from "./pages/admin/estudios/gestion_grupos/detalles/index.jsx";
import Gestion_proyectos_grupos from "./pages/admin/estudios/gestion_proyectos_grupos/index.jsx";
import Detalle_proyecto_grupo from "./pages/admin/estudios/gestion_proyectos_grupos/detalle/index.jsx";
import Gestion_proyectos_fex from "./pages/admin/estudios/gestion_proyectos_fex/index.jsx";
import Informes_tecnicos from "./pages/admin/estudios/informes_tecnicos/index.jsx";
import Monitoreo from "./pages/admin/estudios/monitoreo/index.jsx";
import Detalle_monitoreo from "./pages/admin/estudios/monitoreo/detalles/index.jsx";
import Deudas_proyectos from "./pages/admin/estudios/deudas_proyectos/index.jsx";
import Gestion_publicacion from "./pages/admin/estudios/gestion_publicaciones/index.jsx";

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
          {
            path: "informes_tecnicos",
            element: <Informes_tecnicos />,
          },
          {
            path: "monitoreo",
            children: [
              {
                path: "",
                element: <Monitoreo />,
              },
              {
                path: "detalle",
                element: <Detalle_monitoreo />,
              },
            ],
          },
          {
            path: "deudas_proyectos",
            element: <Deudas_proyectos />,
          },
          {
            path: "gestion_publicaciones",
            element: <Gestion_publicacion />,
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
