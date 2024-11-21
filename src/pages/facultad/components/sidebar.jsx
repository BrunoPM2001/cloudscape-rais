import { SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    type: "section",
    text: "Listado",
    defaultExpanded: true,
    items: [
      {
        type: "link",
        text: "Investigadores",
        href: "/facultad/listado/investigadores",
      },
      {
        type: "link",
        text: "Docente Investigador",
        href: "/facultad/listado/docente_investigador",
      },
      {
        type: "link",
        text: "Proyectos de Investigación",
        href: "/facultad/listado/proyectos",
      },
      {
        type: "link",
        text: "Proyectos de GI",
        href: "/facultad/listado/proyectos_gi",
      },
      {
        type: "link",
        text: "Proyectos de FEX",
        href: "/facultad/listado/proyectos_fex",
      },
      {
        type: "link",
        text: "Grupos de Investigación",
        href: "/facultad/listado/grupos",
      },
      {
        type: "link",
        text: "Publicaciones",
        href: "/facultad/listado/publicaciones",
      },
      {
        type: "link",
        text: "Listado de Informes",
        href: "/facultad/listado/informes",
      },
      {
        type: "link",
        text: "Listado de deudas",
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
      activeHref={location.pathname}
      items={navItems}
    />
  );
}
