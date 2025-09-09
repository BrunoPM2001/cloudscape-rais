import { Badge, SideNavigation, Spinner } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

// Flags de bloqueo
const ACTIVIDADES_BLOQUEO = false;
const PUBLICACIONES_BLOQUEO = false
const GRUPO_BLOQUEO = false;
const CONSTANCIAS_BLOQUEO = false;
const CONVOCATORIA_BLOQUEO = false;
const INFORMES_BLOQUEO = false;

export default function Sidebar({ activeHref = "#", data = [], loading }) {
  const location = useLocation();
  const navItems = [
    { 
      type: "section",
      text: "Actividades",
      defaultExpanded: false,
      items: [
        {
          type: "link",
          text: "Proyectos con financiamiento",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/proyectosConFinanciamiento",

        },
        {
          type: "link",
          text: "Proyectos sin financiamiento",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/proyectosSinFinanciamiento",
        },
        {
          type: "link",
          text: "Proyectos FEX",
          href: ACTIVIDADES_BLOQUEO
            ?  "/investigador/bloqueado"
            : "/investigador/actividades/proyectosFEX",
        },
        {
          type: "link",
          text: "Proyectos multidisciplinario",
          href: ACTIVIDADES_BLOQUEO
            ? "/investigador/bloqueado" 
            : "/investigador/actividades/proyectosMulti",
        },
        {
          type: "link",
          text: "Concurso para publicación de libros universitarios",
          href: ACTIVIDADES_BLOQUEO
            ? "/investigador/bloqueado" 
            : "/investigador/actividades/pubLibroUni",
        },
        { type: "divider" },
        {
          type: "link",
          text: "Asesoría de tesis pregrado",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/asesoriaPre",
        },
        {
          type: "link",
          text: "Asesoría de tesis posgrado",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/asesoriaPos",
        },
        { type: "divider" },
        {
          type: "link",
          text: "Talleres",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/talleres",
        },
        {
          type: "link",
          text: "Eventos",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/eventos",
        },
        {
          type: "link",
          text: "Equipamiento científico",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/eci",

        },
        { type: "divider" },
        {
          type: "link",
          text: "Comité editorial",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado" 
           : "/investigador/actividades/comiteEdi",
        },
        {
          type: "link",
          text: "Grupos de estudio",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/gruposEstudio",
        },
        {
          type: "link",
          text: "Deudas",
          href: ACTIVIDADES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/actividades/deudas",
        },
      ],
    },
    {
      type: "section",
      text: "Publicaciones",
      defaultExpanded: false,
      items: [
        {
          type: "link",
          text: "Artículo en revistas de investigación",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/articulo",
        },
        {
          type: "link",
          text: "Libro",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/libro",
        },
        {
          type: "link",
          text: "Capítulo de libro",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/capitulo",
        },
        {
          type: "link",
          text: "Resumen de evento científico",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/evento",
        },
        {
          type: "link",
          text: "Tesis propias",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/tesisPropia",
        },
        {
          type: "link",
          text: "Tesis asesoría",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/tesisAsesoria",
        },
        {
          type: "link",
          text: "Propiedad intelectual",
          href: PUBLICACIONES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/publicaciones/patente",
        },
        {
          type: "expandable-link-group",
          text: "Listado de revistas y editoriales reconocidas",
          items: [
            {
              type: "link",
              text: "Revistas Scielo",
              href: "https://vrip.unmsm.edu.pe/Documentos/2022/Listado_Revistas/Revistas_Scielo.pdf",
              external: true,
            },
            {
              type: "link",
              text: "Revistas Scopus",
              href: "https://vrip.unmsm.edu.pe/Documentos/2022/Listado_Revistas/Revistas_Scopus.pdf",
              external: true,
            },
            {
              type: "link",
              text: "Revistas WOS - JCR",
              href: "https://vrip.unmsm.edu.pe/Documentos/2022/Listado_Revistas/Revistas_WOS-JCR.pdf",
              external: true,
            },
            {
              type: "link",
              text: "Revistas WOS - ESCI",
              href: "https://vrip.unmsm.edu.pe/Documentos/2022/Listado_Revistas/Revistas_WOS-ESCI.pdf",
              external: true,
            },
            {
              type: "link",
              text: "Editoriales reconocidas",
              href: "https://rais.unmsm.edu.pe/minio/constancias/repo/RAIS_Lista-Editoriales-academicas-reconocidas(enero.2025).pdf",
              external: true,
            },
          ],
        },
      ],
    },
    {
      type: "section",
      text: "Grupo",
      defaultExpanded: false,
      items: [
        {
          type: "link",
          text: "Grupos",
          href: GRUPO_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/grupo",
        },
      ],
    },
    {
      type: "section",
      text: "Constancias",
      defaultExpanded: false,
      items: [
        {
          type: "link",
          text: "Reporte de constancias",
          href: CONSTANCIAS_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/constancias",
        },
      ],
    },
    {
      type: "section",
      text: "Convocatorias",
      defaultExpanded: false,
      items: loading
        ? [
            {
              type: "link",
              text: (
                <>
                  Cargando datos <Spinner />
                </>
              ),
            },
          ]
        : data.map((item) => ({
            type: "link",
            text: item.descripcion ?? "",
            href: CONVOCATORIA_BLOQUEO
             ? "/investigador/bloqueado"
             : item.estado == "Abierta"
                ? "/investigador/convocatoria/" +
                  item.tipo.toLowerCase() +
                  (item.tipo == "PSINFINV" ? "/paso1" : "")
                : "#",
            info:
              item.estado == "Abierta" ? (
                <Badge color="green">Abierta</Badge>
              ) : (
                <Badge color="red">Cerrada</Badge>
              ),
          })),
    },
    {
      type: "section",
      text: "Informes",
      defaultExpanded: false,
      items: [
        {
          type: "link",
          text: "Informe académico",
          href: INFORMES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/informes/informeAcademico",
        },
        {
          type: "link",
          text: "Informe técnico 2016 y anteriores",
          info: <Badge color="grey">En desarrollo</Badge>,
          href: "#",
        },
        {
          type: "link",
          text: "Informe económico",
          href: "/investigador/informes/informeEconomico",
        },
        {
          type: "link",
          text: "Monitoreo",
          href: INFORMES_BLOQUEO
           ? "/investigador/bloqueado"
           : "/investigador/informes/monitoreo",
        },
        {
          type: "link",
          text: "Informe económico 2016 y anteriores",
          info: <Badge color="grey">En desarrollo</Badge>,
          href: "#",
        },
      ],
    },
  ];
  return (
    <SideNavigation
      header={{
        text: "Investigador",
        href: "/investigador",
      }}
      activeHref={"/investigador" + location.pathname}
      items={navItems}
    />
  );
}
