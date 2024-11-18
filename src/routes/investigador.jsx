import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../providers/notificationProvider.jsx";

const Registro_pconfigi_8 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step8.jsx")
);
const Registro_pconfigi_7 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step7.jsx")
);
const Registro_pconfigi_6 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step6.jsx")
);
const Registro_pconfigi_5 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step5.jsx")
);
const Registro_pconfigi_4 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step4.jsx")
);
const Registro_pconfigi_3 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step3.jsx")
);
const Registro_pconfigi_2 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step2.jsx")
);
const Registro_pconfigi_1 = lazy(() =>
  import("../pages/investigador/convocatorias/pconfigi/step1.jsx")
);
const Registro_pfex_5 = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/registrar/step5.jsx")
);
const Registro_pfex_4 = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/registrar/step4.jsx")
);
const Registro_pfex_3 = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/registrar/step3.jsx")
);
const Registro_pfex_2 = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/registrar/step2.jsx")
);
const Registro_pfex_1 = lazy(() =>
  import("../pages/investigador/actividades/proyecto_fex/registrar/step1.jsx")
);
const Registro_psinfipu_0 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step0.jsx")
);
const Registro_psinfipu_6 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step6.jsx")
);
const Registro_psinfipu_5 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step5.jsx")
);
const Registro_psinfipu_4 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step4.jsx")
);
const Registro_psinfipu_3 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step3.jsx")
);
const Registro_psinfipu_2 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step2.jsx")
);
const Registro_psinfipu_1 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfipu/step1.jsx")
);
const Registro_psinfinv_6 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step6.jsx")
);
const Registro_psinfinv_5 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step5.jsx")
);
const Registro_psinfinv_4 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step4.jsx")
);
const Registro_psinfinv_3 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step3.jsx")
);
const Registro_psinfinv_2 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step2.jsx")
);
const Registro_psinfinv_1 = lazy(() =>
  import("../pages/investigador/convocatorias/psinfinv/step1.jsx")
);
const Registrar_patente_4 = lazy(() =>
  import("../pages/investigador/publicaciones/patente/registrar/step4.jsx")
);
const Registrar_patente_3 = lazy(() =>
  import("../pages/investigador/publicaciones/patente/registrar/step3.jsx")
);
const Registrar_patente_2 = lazy(() =>
  import("../pages/investigador/publicaciones/patente/registrar/step2.jsx")
);
const Registrar_patente_1 = lazy(() =>
  import("../pages/investigador/publicaciones/patente/registrar/step1.jsx")
);
const Solicitar_grupo9 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step9.jsx")
);
const Solicitar_grupo8 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step8.jsx")
);
const Convocatoria_registro_taller_6 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step6.jsx")
);
const Convocatoria_registro_taller_5 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step5.jsx")
);
const Convocatoria_registro_taller_4 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step4.jsx")
);
const Convocatoria_registro_taller_3 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step3.jsx")
);
const Convocatoria_registro_taller_2 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step2.jsx")
);
const Convocatoria_registro_taller_1 = lazy(() =>
  import("../pages/investigador/convocatorias/taller/step1.jsx")
);
const Presentar_informe = lazy(() =>
  import(
    "../pages/investigador/informes/informe_academico/presentacion/index.jsx"
  )
);
const Informe_academico = lazy(() =>
  import("../pages/investigador/informes/informe_academico/index.jsx")
);
const Deudas = lazy(() =>
  import("../pages/investigador/actividades/deudas/index.jsx")
);
const Solicitar_grupo7 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step7.jsx")
);
const Solicitar_grupo6 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step6.jsx")
);
const Solicitar_grupo5 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step5.jsx")
);
const Solicitar_grupo4 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step4.jsx")
);
const Solicitar_grupo3 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step3.jsx")
);
const Solicitar_grupo2 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step2.jsx")
);
const Solicitar_grupo1 = lazy(() =>
  import("../pages/investigador/grupo/grupo/solicitar/step1.jsx")
);
const Perfil = lazy(() => import("../pages/investigador/perfil/index.jsx"));
const Informe_economico_detalles = lazy(() =>
  import("../pages/investigador/informes/informe_economico/detalles/index.jsx")
);
const Informe_economico = lazy(() =>
  import("../pages/investigador/informes/informe_economico/index.jsx")
);
const Detalle_grupo_invest = lazy(() =>
  import("../pages/investigador/grupo/grupo/detalles/index.jsx")
);
const Verificar_requisitos = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/verificar.jsx"
  )
);
const Registrar_proyecto_paso1 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout1.jsx"
  )
);
const Registrar_proyecto_paso2 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout2.jsx"
  )
);
const Registrar_proyecto_paso3 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout3.jsx"
  )
);
const Registrar_proyecto_paso4 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout4.jsx"
  )
);
const Registrar_proyecto_paso5 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout5.jsx"
  )
);
const Registrar_proyecto_paso6 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout6.jsx"
  )
);
const Registrar_proyecto_paso7 = lazy(() =>
  import(
    "../pages/investigador/convocatorias/proyecto_financiamiento/layout7.jsx"
  )
);
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
      path: "perfil",
      element: <Perfil />,
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
          children: [
            {
              path: "",
              element: <Proyectos_FEX />,
            },
            {
              path: "paso1",
              element: <Registro_pfex_1 />,
            },
            {
              path: "paso2",
              element: <Registro_pfex_2 />,
            },
            {
              path: "paso3",
              element: <Registro_pfex_3 />,
            },
            {
              path: "paso4",
              element: <Registro_pfex_4 />,
            },
            {
              path: "paso5",
              element: <Registro_pfex_5 />,
            },
          ],
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
          path: "deudas",
          element: <Deudas />,
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
          path: "articulo",
          element: <Articulos />,
        },
        {
          path: "libro",
          element: <Libros />,
        },
        {
          path: "capitulo",
          element: <Capitulos />,
        },
        {
          path: "evento",
          element: <Investigador_Evento />,
        },
        {
          path: "tesisPropia",
          element: <Tesis_propias />,
        },
        {
          path: "tesisAsesoria",
          element: <Tesis_asesorias />,
        },
        {
          path: "patente",
          children: [
            {
              path: "",
              element: <Patentes />,
            },
            {
              path: "paso1",
              element: <Registrar_patente_1 />,
            },
            {
              path: "paso2",
              element: <Registrar_patente_2 />,
            },
            {
              path: "paso3",
              element: <Registrar_patente_3 />,
            },
            {
              path: "paso4",
              element: <Registrar_patente_4 />,
            },
          ],
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
      ],
    },
    {
      path: "grupo",
      children: [
        {
          path: "",
          element: <Grupo />,
        },
        {
          path: "detalles",
          element: <Detalle_grupo_invest />,
        },
        {
          path: "solicitar",
          children: [
            {
              path: "paso1",
              element: <Solicitar_grupo1 />,
            },
            {
              path: "paso2",
              element: <Solicitar_grupo2 />,
            },
            {
              path: "paso3",
              element: <Solicitar_grupo3 />,
            },
            {
              path: "paso4",
              element: <Solicitar_grupo4 />,
            },
            {
              path: "paso5",
              element: <Solicitar_grupo5 />,
            },
            {
              path: "paso6",
              element: <Solicitar_grupo6 />,
            },
            {
              path: "paso7",
              element: <Solicitar_grupo7 />,
            },
            {
              path: "paso8",
              element: <Solicitar_grupo8 />,
            },
            {
              path: "paso9",
              element: <Solicitar_grupo9 />,
            },
          ],
        },
      ],
    },
    {
      path: "convocatoria",
      children: [
        {
          path: "pconfigi",
          children: [
            {
              path: "paso1",
              element: <Registro_pconfigi_1 />,
            },
            {
              path: "paso2",
              element: <Registro_pconfigi_2 />,
            },
            {
              path: "paso3",
              element: <Registro_pconfigi_3 />,
            },
            {
              path: "paso4",
              element: <Registro_pconfigi_4 />,
            },
            {
              path: "paso5",
              element: <Registro_pconfigi_5 />,
            },
            {
              path: "paso6",
              element: <Registro_pconfigi_6 />,
            },
            {
              path: "paso7",
              element: <Registro_pconfigi_7 />,
            },
            {
              path: "paso8",
              element: <Registro_pconfigi_8 />,
            },
          ],
        },
        {
          path: "proctie",
          children: [
            {
              path: "verificar",
              element: <Verificar_requisitos />,
            },
            {
              path: "paso1",
              element: <Registrar_proyecto_paso1 />,
            },
            {
              path: "paso2",
              element: <Registrar_proyecto_paso2 />,
            },
            {
              path: "paso3",
              element: <Registrar_proyecto_paso3 />,
            },
            {
              path: "paso4",
              element: <Registrar_proyecto_paso4 />,
            },
            {
              path: "paso5",
              element: <Registrar_proyecto_paso5 />,
            },
            {
              path: "paso6",
              element: <Registrar_proyecto_paso6 />,
            },
            {
              path: "paso7",
              element: <Registrar_proyecto_paso7 />,
            },
          ],
        },
        {
          path: "taller",
          children: [
            {
              path: "paso1",
              element: <Convocatoria_registro_taller_1 />,
            },
            {
              path: "paso2",
              element: <Convocatoria_registro_taller_2 />,
            },
            {
              path: "paso3",
              element: <Convocatoria_registro_taller_3 />,
            },
            {
              path: "paso4",
              element: <Convocatoria_registro_taller_4 />,
            },
            {
              path: "paso5",
              element: <Convocatoria_registro_taller_5 />,
            },
            {
              path: "paso6",
              element: <Convocatoria_registro_taller_6 />,
            },
          ],
        },
        {
          path: "psinfinv",
          children: [
            {
              path: "paso1",
              element: <Registro_psinfinv_1 />,
            },
            {
              path: "paso2",
              element: <Registro_psinfinv_2 />,
            },
            {
              path: "paso3",
              element: <Registro_psinfinv_3 />,
            },
            {
              path: "paso4",
              element: <Registro_psinfinv_4 />,
            },
            {
              path: "paso5",
              element: <Registro_psinfinv_5 />,
            },
            {
              path: "paso6",
              element: <Registro_psinfinv_6 />,
            },
          ],
        },
        {
          path: "psinfipu",
          children: [
            {
              path: "",
              element: <Registro_psinfipu_0 />,
            },
            {
              path: "paso1",
              element: <Registro_psinfipu_1 />,
            },
            {
              path: "paso2",
              element: <Registro_psinfipu_2 />,
            },
            {
              path: "paso3",
              element: <Registro_psinfipu_3 />,
            },
            {
              path: "paso4",
              element: <Registro_psinfipu_4 />,
            },
            {
              path: "paso5",
              element: <Registro_psinfipu_5 />,
            },
            {
              path: "paso6",
              element: <Registro_psinfipu_6 />,
            },
          ],
        },
      ],
    },
    {
      path: "informes",
      children: [
        {
          path: "informeEconomico",
          children: [
            {
              path: "",
              element: <Informe_economico />,
            },
            {
              path: "detalle",
              element: <Informe_economico_detalles />,
            },
          ],
        },
        {
          path: "informeAcademico",
          children: [
            {
              path: "",
              element: <Informe_academico />,
            },
            {
              path: "presentar",
              element: <Presentar_informe />,
            },
          ],
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
