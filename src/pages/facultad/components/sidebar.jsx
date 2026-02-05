import { SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    type: "section",
    text: "Investigadores",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Usuarios docentes",
        href: "/facultad/listado/investigadores",
      },
      {
        type: "link",
        text: "Estudiantes investigadores",
        href: "/facultad/listado/estudiantes",
      },
      {
        type: "link",
        text: "Docente Investigador",
        href: "/facultad/listado/docente_investigador",
      },
    ],
  },
  {
    type: "section",
    text: "Grupos",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Grupos de Investigación",
        href: "/facultad/listado/grupos",
      },
    ],
  },
  {
    type: "section",
    text: "Proyectos",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Proyectos de Investigación",
        href: "/facultad/listado/proyectos",
      },
      {
        type: "link",
        text: "Proyectos con Financiamiento Externo",
        href: "/facultad/listado/proyectos_fex",
      },
    ],
  },
  {
    type: "section",
    text: "Publicaciones",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Publicaciones",
        href: "/facultad/listado/publicaciones",
      },
    ],
  },
  {
    type: "section",
    text: "Informes",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Informes técnicos",
        href: "/facultad/listado/informes",
      },
    ],
  },
  {
    type: "section",
    text: "Deudas",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Listado de Deudas",
        href: "/facultad/listado/deudas",
      },
    ],
  },
];

export default function Sidebar({ activeHref = "#" }) {
  const location = useLocation();
  return (
    <SideNavigation
      header={{
        text: "Facultad",
        href: "/facultad",
      }}
      activeHref={"/facultad" + location.pathname}
      items={navItems}
    />
  );
}
