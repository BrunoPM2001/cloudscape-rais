import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "@cloudscape-design/global-styles/index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/index.jsx";

//  Pages
const Admin_main = lazy(() => import("./pages/admin/dashboard/index.jsx"));
const Gestion_convocatorias = lazy(() =>
  import("./pages/admin/estudios/gestion_convocatorias/index.jsx")
);
const Detalle_evaluacion = lazy(() =>
  import("./pages/admin/estudios/gestion_convocatorias/detalles/index.jsx")
);
const Convocatorias = lazy(() =>
  import("./pages/admin/facultad/convocatorias/index.jsx")
);
const Detalle_convocatoria = lazy(() =>
  import("./pages/admin/facultad/convocatorias/detalles/index.jsx")
);
const Gestion_grupos = lazy(() =>
  import("./pages/admin/estudios/gestion_grupos/index.jsx")
);
const Lineas_investigacion = lazy(() =>
  import("./pages/admin/admin/lineas/index.jsx")
);
const Usuarios_administrativos = lazy(() =>
  import("./pages/admin/admin/usuarios_administrativos/index.jsx")
);
const Usuarios_investigadores = lazy(() =>
  import("./pages/admin/admin/usuarios_investigadores/index.jsx")
);
const Detalle_grupo = lazy(() =>
  import("./pages/admin/estudios/gestion_grupos/detalles/index.jsx")
);
const Gestion_proyectos_grupos = lazy(() =>
  import("./pages/admin/estudios/gestion_proyectos_grupos/index.jsx")
);
const Detalle_proyecto_grupo = lazy(() =>
  import("./pages/admin/estudios/gestion_proyectos_grupos/detalle/index.jsx")
);
const Gestion_proyectos_fex = lazy(() =>
  import("./pages/admin/estudios/gestion_proyectos_fex/index.jsx")
);
const Informes_tecnicos = lazy(() =>
  import("./pages/admin/estudios/informes_tecnicos/index.jsx")
);
const Monitoreo = lazy(() =>
  import("./pages/admin/estudios/monitoreo/index.jsx")
);
const Detalle_monitoreo = lazy(() =>
  import("./pages/admin/estudios/monitoreo/detalles/index.jsx")
);
const Deudas_proyectos = lazy(() =>
  import("./pages/admin/estudios/deudas_proyectos/index.jsx")
);
const Gestion_publicacion = lazy(() =>
  import("./pages/admin/estudios/gestion_publicaciones/index.jsx")
);
const Reporte_estudio = lazy(() =>
  import("./pages/admin/reportes/estudio/index.jsx")
);
const Reporte_grupo = lazy(() =>
  import("./pages/admin/reportes/grupo/index.jsx")
);
const Reporte_proyecto = lazy(() =>
  import("./pages/admin/reportes/proyecto/index.jsx")
);
const Reporte_investigador = lazy(() =>
  import("./pages/admin/reportes/investigador/index.jsx")
);
const Consolidado_general = lazy(() =>
  import("./pages/admin/reportes/consolidado_general/index.jsx")
);
const Reporte_presupuesto = lazy(() =>
  import("./pages/admin/reportes/presupuesto/index.jsx")
);
const Reporte_constancias = lazy(() =>
  import("./pages/admin/constancias/reporte_constancias/index.jsx")
);

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "admin",
    children: [
      {
        path: "",
        element: <Admin_main />,
      },
      {
        path: "estudios",
        children: [
          {
            path: "convocatorias",
            children: [
              {
                path: "",
                element: <Gestion_convocatorias />,
              },
              {
                path: "detalle",
                element: <Detalle_evaluacion />,
              },
            ],
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
        path: "reportes",
        children: [
          {
            path: "estudio",
            element: <Reporte_estudio />,
          },
          {
            path: "grupo",
            element: <Reporte_grupo />,
          },
          {
            path: "proyecto",
            element: <Reporte_proyecto />,
          },
          {
            path: "investigador",
            element: <Reporte_investigador />,
          },
          {
            path: "consolidado_general",
            element: <Consolidado_general />,
          },
          {
            path: "presupuesto",
            element: <Reporte_presupuesto />,
          },
        ],
      },
      {
        path: "constancias",
        element: <Reporte_constancias />,
      },
      {
        path: "facultad",
        children: [
          {
            path: "convocatorias",
            children: [
              {
                path: "",
                element: <Convocatorias />,
              },
              {
                path: "detalle",
                element: <Detalle_convocatoria />,
              },
            ],
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
