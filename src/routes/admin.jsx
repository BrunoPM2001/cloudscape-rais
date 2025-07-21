import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider";

const Detalle_proyecto_pmulti = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/pmulti/index.jsx"
  )
);
const Presentar_informe_tecnico_antiguo = lazy(() =>
  import(
    "../pages/admin/estudios/informes_tecnicos/presentar_antiguo/index.jsx"
  )
);
const Reporte_deudores = lazy(() =>
  import("../pages/admin/reportes/deudores/index.jsx")
);
const Detalle_proyecto_ptpgrado = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/ptpgrado/index.jsx"
  )
);
const Detalle_proyecto_ptpmaest = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/ptpmaest/index.jsx"
  )
);
const Detalle_proyecto_ptpdocto = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/ptpdocto/index.jsx"
  )
);
const Detalle_proyecto_ptpbachiller = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/ptpbachiller/index.jsx"
  )
);
const Detalle_informe_tecnico_antiguo = lazy(() =>
  import(
    "../pages/admin/estudios/informes_tecnicos/detalles_antiguos/index.jsx"
  )
);
const Monitoreo_detalles = lazy(() =>
  import("../pages/admin/estudios/monitoreo/detalles/index.jsx")
);
const Registrar_proyecto_fex_4 = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/nuevo/layout4.jsx")
);
const Detalle_proyecto_fex = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/detalles/index.jsx")
);
const Detalle_patente = lazy(() =>
  import("../pages/admin/estudios/gestion_publicaciones/patente/index.jsx")
);
const Nueva_publicacion = lazy(() =>
  import("../pages/admin/estudios/gestion_publicaciones/nuevo/index.jsx")
);
const Proyectos_evaluados = lazy(() =>
  import("../pages/admin/facultad/proyectos_evaluados/index.jsx")
);
const Registrar_proyecto_fex_3 = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/nuevo/layout3.jsx")
);
const Registrar_proyecto_fex_2 = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/nuevo/layout2.jsx")
);
const Registrar_proyecto_fex_1 = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/nuevo/layout1.jsx")
);
const Detalle_publicacion = lazy(() =>
  import("../pages/admin/estudios/gestion_publicaciones/detalles/index.jsx")
);
const Gestion_evaluadores = lazy(() =>
  import("../pages/admin/facultad/gestion_evaluadores/index.jsx")
);
const Docente_investigador_evaluacion = lazy(() =>
  import("../pages/admin/estudios/docentes/evaluacion/index.jsx")
);
const Docente_investigador = lazy(() =>
  import("../pages/admin/estudios/docentes/index.jsx")
);
const Asignar_evaluador = lazy(() =>
  import("../pages/admin/facultad/evaluadores/index.jsx")
);
const Detalle_proyecto_pinvpos = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/pinvpos/index.jsx"
  )
);
const Detalle_proyecto_psinfipu = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/psinfipu/index.jsx"
  )
);
const Detalle_proyecto_psinfinv = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/psinfinv/index.jsx"
  )
);
const Detalle_proyecto_pconfigi_inv = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/pconfigi_inv/index.jsx"
  )
);
const Detalle_proyecto_pconfigi = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/pconfigi/index.jsx"
  )
);
const Detalle_proyecto_eci = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/eci/index.jsx"
  )
);
const Detalle_proyecto_picv = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/picv/index.jsx"
  )
);
const Detalle_proyecto_proctie = lazy(() =>
  import(
    "../pages/admin/estudios/gestion_proyectos_grupos/detalle/proctie/index.jsx"
  )
);
const Detalle_informe_tecnico = lazy(() =>
  import("../pages/admin/estudios/informes_tecnicos/detalles/index.jsx")
);
const Admin_main = lazy(() => import("../pages/admin/dashboard/index.jsx"));
const Gestion_convocatorias = lazy(() =>
  import("../pages/admin/estudios/gestion_convocatorias/index.jsx")
);
const Detalle_evaluacion = lazy(() =>
  import("../pages/admin/estudios/gestion_convocatorias/detalles/index.jsx")
);
const Convocatorias = lazy(() =>
  import("../pages/admin/facultad/convocatorias/index.jsx")
);
const Detalle_convocatoria = lazy(() =>
  import("../pages/admin/facultad/convocatorias/detalles/index.jsx")
);
const Gestion_grupos = lazy(() =>
  import("../pages/admin/estudios/gestion_grupos/index.jsx")
);
const Lineas_investigacion = lazy(() =>
  import("../pages/admin/admin/lineas/index.jsx")
);
const Usuarios_administrativos = lazy(() =>
  import("../pages/admin/admin/usuarios_administrativos/index.jsx")
);
const Usuarios_investigadores = lazy(() =>
  import("../pages/admin/admin/usuarios_investigadores/index.jsx")
);
const Detalle_grupo = lazy(() =>
  import("../pages/admin/estudios/gestion_grupos/detalles/index.jsx")
);
const Gestion_proyectos_grupos = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_grupos/index.jsx")
);
const Gestion_proyectos_fex = lazy(() =>
  import("../pages/admin/estudios/gestion_proyectos_fex/index.jsx")
);
const Informes_tecnicos = lazy(() =>
  import("../pages/admin/estudios/informes_tecnicos/index.jsx")
);
const Monitoreo = lazy(() =>
  import("../pages/admin/estudios/monitoreo/index.jsx")
);
const Deudas_proyectos = lazy(() =>
  import("../pages/admin/estudios/deudas_proyectos/index.jsx")
);
const Gestion_publicacion = lazy(() =>
  import("../pages/admin/estudios/gestion_publicaciones/index.jsx")
);
const Gestion_investigadores = lazy(() =>
  import("../pages/admin/estudios/gestion_investigadores/index.jsx")
);
const Editar_investigador = lazy(() =>
  import("../pages/admin/estudios/gestion_investigadores/editar/index.jsx")
);
const Agregar_investigador = lazy(() =>
  import("../pages/admin/estudios/gestion_investigadores/agregar/index.jsx")
);
const Licencias_investigador = lazy(() =>
  import("../pages/admin/estudios/gestion_investigadores/licencias/index.jsx")
);
const Gestion_comprobantes = lazy(() =>
  import("../pages/admin/economia/gestion_comprobantes/index.jsx")
);
const Geco_detalle_proyecto = lazy(() =>
  import("../pages/admin/economia/gestion_comprobantes/detalles/index.jsx")
);
const Gestion_transferencias = lazy(() =>
  import("../pages/admin/economia/gestion_transferencias/index.jsx")
);
const Geco_detalle_transferencia = lazy(() =>
  import("../pages/admin/economia/gestion_transferencias/detalles/index.jsx")
);
const Reporte_estudio = lazy(() =>
  import("../pages/admin/reportes/estudio/index.jsx")
);
const Reporte_grupo = lazy(() =>
  import("../pages/admin/reportes/grupo/index.jsx")
);
const Reporte_proyecto = lazy(() =>
  import("../pages/admin/reportes/proyecto/index.jsx")
);
const Reporte_investigador = lazy(() =>
  import("../pages/admin/reportes/investigador/index.jsx")
);
const Consolidado_general = lazy(() =>
  import("../pages/admin/reportes/consolidado_general/index.jsx")
);
const Reporte_presupuesto = lazy(() =>
  import("../pages/admin/reportes/presupuesto/index.jsx")
);
const Reporte_constancias = lazy(() =>
  import("../pages/admin/constancias/reporte_constancias/index.jsx")
);

const Revistas = lazy(() =>
  import("../pages/admin/estudios/revistas/index.jsx")
);
const Gestion_laboratorios = lazy(() =>
  import("../pages/admin/estudios/gestion_laboratorios/index.jsx")
);

const Gestion_sum = lazy(() =>
  import("../pages/admin/estudios/gestion_sum/index.jsx")
);

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Admin_main />,
    },
    {
      path: "perfil",
      children: [
        {
          path: "change_pass",
          lazy: () =>
            import("../pages/admin/perfil/cambiar_password/index.jsx"),
        },
      ],
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
              children: [
                {
                  path: "",
                  element: <div></div>,
                },
                {
                  path: "eci",
                  element: <Detalle_proyecto_eci />,
                },
                {
                  path: "pconfigi",
                  element: <Detalle_proyecto_pconfigi />,
                },
                {
                  path: "pconfigi-inv",
                  element: <Detalle_proyecto_pconfigi_inv />,
                },
                {
                  path: "psinfinv",
                  element: <Detalle_proyecto_psinfinv />,
                },
                {
                  path: "psinfipu",
                  element: <Detalle_proyecto_psinfipu />,
                },
                {
                  path: "pinvpos",
                  element: <Detalle_proyecto_pinvpos />,
                },
                {
                  path: "picv",
                  element: <Detalle_proyecto_picv />,
                },
                {
                  path: "pro-ctie",
                  element: <Detalle_proyecto_proctie />,
                },
                {
                  path: "ptpbachiller",
                  element: <Detalle_proyecto_ptpbachiller />,
                },
                {
                  path: "ptpdocto",
                  element: <Detalle_proyecto_ptpdocto />,
                },
                {
                  path: "ptpmaest",
                  element: <Detalle_proyecto_ptpmaest />,
                },
                {
                  path: "ptpgrado",
                  element: <Detalle_proyecto_ptpgrado />,
                },
                {
                  path: "pmulti",
                  element: <Detalle_proyecto_pmulti />,
                },
              ],
            },
          ],
        },
        {
          path: "proyectos_fex",
          children: [
            {
              path: "",
              element: <Gestion_proyectos_fex />,
            },
            {
              path: "detalle",
              element: <Detalle_proyecto_fex />,
            },
            {
              path: "paso_1",
              element: <Registrar_proyecto_fex_1 />,
            },
            {
              path: "paso_2",
              element: <Registrar_proyecto_fex_2 />,
            },
            {
              path: "paso_3",
              element: <Registrar_proyecto_fex_3 />,
            },
            {
              path: "paso_4",
              element: <Registrar_proyecto_fex_4 />,
            },
          ],
        },
        {
          path: "informes_tecnicos",
          children: [
            {
              path: "",
              element: <Informes_tecnicos />,
            },
            {
              path: "detalle",
              element: <Detalle_informe_tecnico />,
            },
            {
              path: "detalleAntiguo",
              element: <Detalle_informe_tecnico_antiguo />,
            },
            {
              path: "presentarAntiguo",
              element: <Presentar_informe_tecnico_antiguo />,
            },
          ],
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
              element: <Monitoreo_detalles />,
            },
          ],
        },
        {
          path: "deudas_proyectos",
          element: <Deudas_proyectos />,
        },
        {
          path: "gestion_publicaciones",
          children: [
            {
              path: "",
              element: <Gestion_publicacion />,
            },
            {
              path: "detalle",
              element: <Detalle_publicacion />,
            },
            {
              path: "nuevo",
              element: <Nueva_publicacion />,
            },
            {
              path: "patente",
              element: <Detalle_patente />,
            },
          ],
        },
        {
          path: "revistas",
          element: <Revistas />,
        },
        {
          path: "laboratorios",
          element: <Gestion_laboratorios />,
        },
        {
          path: "gestion_investigadores",
          children: [
            {
              path: "",
              element: <Gestion_investigadores />,
            },
            {
              path: "editar",
              element: <Editar_investigador />,
            },
            {
              path: "agregar",
              element: <Agregar_investigador />,
            },
            {
              path: "licencias",
              element: <Licencias_investigador />,
            },
          ],
        },
        {
          path: "docente_investigador",
          children: [
            {
              path: "",
              element: <Docente_investigador />,
            },
            {
              path: "evaluacion",
              element: <Docente_investigador_evaluacion />,
            },
          ],
        },
        {
          path: "gestion_sum",
          element: <Gestion_sum />,
        },
      ],
    },
    {
      path: "economia",
      children: [
        {
          path: "gestion_comprobantes",
          children: [
            {
              path: "",
              element: <Gestion_comprobantes />,
            },
            {
              path: "detalle",
              element: <Geco_detalle_proyecto />,
            },
          ],
        },
        {
          path: "gestion_transferencias",
          children: [
            {
              path: "",
              element: <Gestion_transferencias />,
            },
            {
              path: "detalle",
              element: <Geco_detalle_transferencia />,
            },
          ],
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
        {
          path: "deudores",
          element: <Reporte_deudores />,
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
        {
          path: "gestion_evaluadores",
          children: [
            {
              path: "",
              element: <Gestion_evaluadores />,
            },
          ],
        },
        {
          path: "evaluadores",
          children: [
            {
              path: "",
              element: <Asignar_evaluador />,
            },
          ],
        },
        {
          path: "evaluaciones",
          children: [
            {
              path: "",
              element: <Proyectos_evaluados />,
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
  {
    basename: "/admin",
  }
);

export default function AdminRoutes() {
  return (
    <NotificationProvider>
      <Suspense fallback>
        <RouterProvider router={routes} />
      </Suspense>
    </NotificationProvider>
  );
}
