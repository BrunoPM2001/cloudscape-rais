import { lazy } from "react";

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
const Registrar_articulo = lazy(() =>
  import("../pages/investigador/publicaciones/articulo/registrar/index.jsx")
);

const Investigador_main = lazy(() =>
  import("../pages/investigador/dashboard/index.jsx")
);

export default [
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
      {
        path: "registrar",
        element: <Registrar_articulo />,
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
];
