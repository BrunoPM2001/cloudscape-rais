import { SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

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
        href: "#",
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
        href: "/investigador/publicaciones/articulos",
      },
      {
        type: "link",
        text: "Libro",
        href: "#",
      },
      {
        type: "link",
        text: "Capítulo de libro",
        href: "#",
      },
      {
        type: "link",
        text: "Resumen de evento científico",
        href: "#",
      },
      {
        type: "link",
        text: "Tesis propias",
        href: "#",
      },
      { type: "link", text: "Tesis asesoría", href: "#" },
      {
        type: "link",
        text: "Propiedad intelectual",
        href: "#",
      },
      {
        type: "link",
        text: "Listado de revistas y editoriales reconocidas",
        href: "#",
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
        href: "#",
      },
    ],
  },
  {
    type: "section",
    text: "Convocatorias",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Proyecto con financiamiento innova",
        href: "#",
      },
    ],
  },
  {
    type: "section",
    text: "Informes",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Informe académico",
        href: "#",
      },
      {
        type: "link",
        text: "Informe técnico 2016 y anteriores",
        href: "#",
      },
      {
        type: "link",
        text: "Informe económico",
        href: "#",
      },
      {
        type: "link",
        text: "Monitoreo",
        href: "#",
      },
      {
        type: "link",
        text: "Informe económico 2016 y anteriores",
        href: "#",
      },
    ],
  },
];

export default function Sidebar({ activeHref = "#" }) {
  const location = useLocation();
  return (
    <SideNavigation
      header={{
        text: "Investigador",
        href: "/investigador",
      }}
      activeHref={location.pathname}
      items={navItems}
    />
  );
}
