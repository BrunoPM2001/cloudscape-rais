import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider.jsx";

const Proyectos_con_financiamiento = lazy(() =>
  import(
    "../pages/investigador/actividades/proyectos_con_financiamiento/index.jsx"
  )
);
const Proyectos_sin_financiamiento = lazy(() =>
  import(
    "../pages/investigador/actividades/proyectos_sin_financiamiento/index.jsx"
  )
);
const Proyectos_FEX = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/index.jsx")
);
const Proyectos_multi = lazy(() =>
  import("../pages/investigador/actividades/proyecto_multi/index.jsx")
);
const Proyectos_pubLibro = lazy(() =>
  import("../pages/investigador/actividades/proyecto_pubLibro/index.jsx")
);
const Asesoria_pregrado = lazy(() =>
  import("../pages/investigador/actividades/asesoriaPre/index.jsx")
);
const Asesoria_posgrado = lazy(() =>
  import("../pages/investigador/actividades/asesoriaPos/index.jsx")
);
const Talleres = lazy(() =>
  import("../pages/investigador/actividades/talleres/index.jsx")
);
const Eventos = lazy(() =>
  import("../pages/investigador/actividades/eventos/index.jsx")
);
const Proyectos_eci = lazy(() =>
  import("../pages/investigador/actividades/proyecto_eci/index.jsx")
);
const Comite_editorial = lazy(() =>
  import("../pages/investigador/actividades/comite_editorial/index.jsx")
);
const Grupos_estudio = lazy(() =>
  import("../pages/investigador/actividades/grupos_estudio/index.jsx")
);
const Proyecto_detalle = lazy(() =>
  import("../pages/investigador/actividades/reporte/index.jsx")
);

const Articulos = lazy(() =>
  import("../pages/investigador/publicaciones/articulo/index.jsx")
);
const Libros = lazy(() =>
  import("../pages/investigador/publicaciones/libro/index.jsx")
);
const Capitulos = lazy(() =>
  import("../pages/investigador/publicaciones/capitulo/index.jsx")
);
const Investigador_Evento = lazy(() =>
  import("../pages/investigador/publicaciones/evento/index.jsx")
);
const Tesis_propias = lazy(() =>
  import("../pages/investigador/publicaciones/tesis_propia/index.jsx")
);
const Tesis_asesorias = lazy(() =>
  import("../pages/investigador/publicaciones/tesis_asesoria/index.jsx")
);
const Patentes = lazy(() =>
  import("../pages/investigador/publicaciones/patente/index.jsx")
);
const Grupo = lazy(() => import("../pages/investigador/grupo/grupo/index.jsx"));
const Registrar_articulo_paso1 = lazy(() =>
  import("../pages/investigador/publicaciones/registrar/layout1.jsx")
);
const Registrar_articulo_paso2 = lazy(() =>
  import("../pages/investigador/publicaciones/registrar/layout2.jsx")
);
const Registrar_articulo_paso3 = lazy(() =>
  import("../pages/investigador/publicaciones/registrar/layout3.jsx")
);
const Registrar_articulo_paso4 = lazy(() =>
  import("../pages/investigador/publicaciones/registrar/layout4.jsx")
);
const Investigador_main = lazy(() =>
  import("../pages/investigador/dashboard/index.jsx")
);

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Investigador_main />,
    },
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
        {
          path: "proyectoDetalle",
          element: <Proyecto_detalle />,
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
          path: "registrar",
          children: [
            {
              path: "paso1",
              element: <Registrar_articulo_paso1 />,
            },
            {
              path: "paso2",
              element: <Registrar_articulo_paso2 />,
            },
            {
              path: "paso3",
              element: <Registrar_articulo_paso3 />,
            },
            {
              path: "paso4",
              element: <Registrar_articulo_paso4 />,
            },
          ],
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
  {
    basename: "/investigador",
  }
);

export default function InvestigadorRoutes() {
  return (
    <NotificationProvider>
      <Suspense fallback>
        <RouterProvider router={routes} />
      </Suspense>
    </NotificationProvider>
  );
}
