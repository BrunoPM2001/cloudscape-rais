import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "@cloudscape-design/global-styles/index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.es";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/index.jsx";
import Revistas from "./pages/admin/estudios/revistas/index.jsx";
import Gestion_laboratorios from "./pages/admin/estudios/gestion_laboratorios/index.jsx";
import Proyectos_con_financiamiento from "./pages/investigador/actividades/proyectos_con_financiamiento/index.jsx";
import Proyectos_sin_financiamiento from "./pages/investigador/actividades/proyectos_sin_financiamiento/index.jsx";
import Proyectos_FEX from "./pages/investigador/actividades/proyecto_fex/index.jsx";
import Proyectos_multi from "./pages/investigador/actividades/proyecto_multi/index.jsx";
import Proyectos_pubLibro from "./pages/investigador/actividades/proyecto_pubLibro/index.jsx";
import Asesoria_pregrado from "./pages/investigador/actividades/asesoriaPre/index.jsx";
import Asesoria_posgrado from "./pages/investigador/actividades/asesoriaPos/index.jsx";
import Talleres from "./pages/investigador/actividades/talleres/index.jsx";
import Eventos from "./pages/investigador/actividades/eventos/index.jsx";
import Proyectos_eci from "./pages/investigador/actividades/proyecto_eci/index.jsx";
import Comite_editorial from "./pages/investigador/actividades/comite_editorial/index.jsx";
import Grupos_estudio from "./pages/investigador/actividades/grupos_estudio/index.jsx";
import Articulos from "./pages/investigador/publicaciones/articulo/index.jsx";
import Libros from "./pages/investigador/publicaciones/libro/index.jsx";
import Capitulos from "./pages/investigador/publicaciones/capitulo/index.jsx";
import Investigador_Evento from "./pages/investigador/publicaciones/evento/index.jsx";
import Tesis_propias from "./pages/investigador/publicaciones/tesis_propia/index.jsx";
import Tesis_asesorias from "./pages/investigador/publicaciones/tesis_asesoria/index.jsx";
import Patentes from "./pages/investigador/publicaciones/patente/index.jsx";
import Grupo from "./pages/investigador/grupo/grupo/index.jsx";

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
          {
            path: "revistas",
            element: <Revistas />,
          },
          {
            path: "laboratorios",
            element: <Gestion_laboratorios />,
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
  {
    path: "investigador",
    children: [
      {
        path: "actividades",
        children: [
          {
            path: "proyectosConFinanciamiento",
            element: <Proyectos_con_financiamiento />,
          },
          {
            path: "proyectosSinFinanciamiento",
            element: <Proyectos_sin_financiamiento />,
          },
          {
            path: "proyectosFEX",
            element: <Proyectos_FEX />,
          },
          {
            path: "proyectosMulti",
            element: <Proyectos_multi />,
          },
          {
            path: "pubLibroUni",
            element: <Proyectos_pubLibro />,
          },
          {
            path: "asesoriaPre",
            element: <Asesoria_pregrado />,
          },
          {
            path: "asesoriaPos",
            element: <Asesoria_posgrado />,
          },
          {
            path: "talleres",
            element: <Talleres />,
          },
          {
            path: "eventos",
            element: <Eventos />,
          },
          {
            path: "eci",
            element: <Proyectos_eci />,
          },
          {
            path: "comiteEdi",
            element: <Comite_editorial />,
          },
          {
            path: "gruposEstudio",
            element: <Grupos_estudio />,
          },
        ],
      },
      {
        path: "publicaciones",
        children: [
          {
            path: "articulos",
            element: <Articulos />,
          },
          {
            path: "libros",
            element: <Libros />,
          },
          {
            path: "capitulos",
            element: <Capitulos />,
          },
          {
            path: "eventos",
            element: <Investigador_Evento />,
          },
          {
            path: "tesisPropias",
            element: <Tesis_propias />,
          },
          {
            path: "tesisAsesorias",
            element: <Tesis_asesorias />,
          },
          {
            path: "patentes",
            element: <Patentes />,
          },
        ],
      },
      {
        path: "grupo",
        children: [
          {
            path: "",
            element: <Grupo />,
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
