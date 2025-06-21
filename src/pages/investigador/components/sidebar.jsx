import { Badge, SideNavigation, Spinner } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

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
          href: "/investigador/actividades/proyectosConFinanciamiento",
        },
        // { type: "divider" },
        {
          type: "link",
          text: "Proyectos sin financiamiento",
          href: "/investigador/actividades/proyectosSinFinanciamiento",
        },
        {
          type: "link",
          text: "Proyectos FEX",
          href: "/investigador/actividades/proyectosFEX",
        },
        {
          type: "link",
          text: "Proyectos multidiciplinario",
          href: "/investigador/actividades/proyectosMulti",
        },
        {
          type: "link",
          text: "Concurso para publicación de libros universitarios",
          href: "/investigador/actividades/pubLibroUni",
        },
        { type: "divider" },
        {
          type: "link",
          text: "Asesoría de tesis pregrado",
          href: "/investigador/actividades/asesoriaPre",
        },
        {
          type: "link",
          text: "Asesoría de tesis posgrado",
          href: "/investigador/actividades/asesoriaPos",
        },
        { type: "divider" },
        {
          type: "link",
          text: "Talleres",
          href: "/investigador/actividades/talleres",
        },
        {
          type: "link",
          text: "Eventos",
          href: "/investigador/actividades/eventos",
        },
        {
          type: "link",
          text: "Equipamiento científico",
          href: "/investigador/actividades/eci",
        },
        { type: "divider" },
        {
          type: "link",
          text: "Comité editorial",
          href: "/investigador/actividades/comiteEdi",
        },
        {
          type: "link",
          text: "Grupos de estudio",
          href: "/investigador/actividades/gruposEstudio",
        },
        {
          type: "link",
          text: "Deudas",
          href: "/investigador/actividades/deudas",
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
          href: "/investigador/publicaciones/articulo",
        },
        {
          type: "link",
          text: "Libro",
          href: "/investigador/publicaciones/libro",
        },
        {
          type: "link",
          text: "Capítulo de libro",
          href: "/investigador/publicaciones/capitulo",
        },
        {
          type: "link",
          text: "Resumen de evento científico",
          href: "/investigador/publicaciones/evento",
        },
        {
          type: "link",
          text: "Tesis propias",
          href: "/investigador/publicaciones/tesisPropia",
        },
        {
          type: "link",
          text: "Tesis asesoría",
          href: "/investigador/publicaciones/tesisAsesoria",
        },
        {
          type: "link",
          text: "Propiedad intelectual",
          href: "/investigador/publicaciones/patente",
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
          href: "/investigador/grupo",
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
          href: "/investigador/constancias",
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
            href:
              item.estado == "Abierta"
                ? "/investigador/convocatoria/" + item.tipo.toLowerCase()
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
          href: "/investigador/informes/informeAcademico",
          // href: "#",
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
          href: "/investigador/informes/monitoreo",
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
