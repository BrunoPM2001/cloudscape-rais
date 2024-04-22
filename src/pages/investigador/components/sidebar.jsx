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
        href: "#",
      },
      // { type: "divider" },
      {
        type: "link",
        text: "Proyectos sin financiamiento",
        href: "#",
      },
      {
        type: "link",
        text: "Proyectos FEX",
        href: "#",
      },
      {
        type: "link",
        text: "Proyectos multidiciplinario",
        href: "#",
      },
      {
        type: "link",
        text: "Concurso para publicación de libros universitarios",
        href: "#",
      },
      { type: "divider" },
      { type: "link", text: "Asesoría de tesis pregrado", href: "#" },
      { type: "link", text: "Asesoría de tesis posgrado", href: "#" },
      { type: "divider" },
      {
        type: "link",
        text: "Talleres",
        href: "#",
      },
      {
        type: "link",
        text: "Eventos",
        href: "#",
      },
      {
        type: "link",
        text: "Equipamiento científico",
        href: "#",
      },
      { type: "divider" },
      {
        type: "link",
        text: "Comité editorial",
        href: "#",
      },
      { type: "link", text: "Grupos de estudio", href: "#" },
      { type: "link", text: "Multidisciplinario", href: "#" },
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
        href: "#",
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
