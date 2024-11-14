import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider";

const Facultad_listado = lazy(() =>
  import("../pages/facultad/dashboard/index")
);
const Facultad_reportes = lazy(() => import("../pages/evaluador/evaluaciones"));

const Listado_investigadores = lazy(() =>
  import("../pages/facultad/listado/investigadores")
);

const Listado_Docente_Investigador = lazy(() =>
  import("../pages/facultad/listado/docente_investigador")
);

const Listado_proyectos = lazy(() =>
  import("../pages/facultad/listado/proyectos")
);

const Listado_proyectos_gi = lazy(() =>
  import("../pages/facultad/listado/proyectos_gi")
);

const Listado_proyectos_fex = lazy(() =>
  import("../pages/facultad/listado/proyectos_fex")
);

const Listado_grupos = lazy(() => import("../pages/facultad/listado/grupos"));

const Listado_publicaciones = lazy(() =>
  import("../pages/facultad/listado/publicaciones")
);

const Listado_informes = lazy(() =>
  import("../pages/facultad/listado/informes")
);

const Listado_deudas = lazy(() => import("../pages/facultad/listado/deudas"));

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Facultad_listado />,
    },
    {
      path: "detalle",
      element: <Facultad_reportes />,
    },
    {
      path: "listado",
      children: [
        {
          path: "investigadores",
          element: <Listado_investigadores />,
        },
        {
          path: "docente_investigador",
          element: <Listado_Docente_Investigador />,
        },
        {
          path: "proyectos",
          element: <Listado_proyectos />,
        },
        {
          path: "proyectos_gi",
          element: <Listado_proyectos_gi />,
        },
        {
          path: "proyectos_fex",
          element: <Listado_proyectos_fex />,
        },
        {
          path: "grupos",
          element: <Listado_grupos />,
        },
        {
          path: "publicaciones",
          element: <Listado_publicaciones />,
        },
        {
          path: "informes",
          element: <Listado_informes />,
        },
        {
          path: "deudas",
          element: <Listado_deudas />,
        },
      ],
    },
  ],
  {
    basename: "/facultad",
  }
);

export default function FacultadRoutes() {
  return (
    <NotificationProvider>
      <Suspense fallback>
        <RouterProvider router={routes} />
      </Suspense>
    </NotificationProvider>
  );
}
