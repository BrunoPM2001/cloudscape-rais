import { SideNavigation } from "@cloudscape-design/components";

const navItems = [
  {
    type: "section",
    text: "Estudios",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Gestión de convocatorias",
        href: "#/convocatorias",
      },
      { type: "divider" },
      { type: "link", text: "Gestión de grupos", href: "#" },
      { type: "link", text: "Gestión de proyectos de grupos", href: "#" },
      { type: "link", text: "Gestión de proyectos FEX", href: "#" },
      { type: "link", text: "Gestión de proyectos", href: "#" },
      { type: "link", text: "Informes técnicos", href: "#" },
      { type: "link", text: "Monitoreo", href: "#" },
      { type: "link", text: "Deuda de proyectos", href: "#" },
      { type: "divider" },
      { type: "link", text: "Gestión de publicaciones", href: "#" },
      { type: "link", text: "Sincronizar publicaciones", href: "#" },
      { type: "link", text: "Revistas", href: "#" },
      { type: "link", text: "Gestión de laboratorios", href: "#" },
      { type: "divider" },
      { type: "link", text: "Gestión de investigadores", href: "#" },
      { type: "link", text: "Docente investigador", href: "#" },
      { type: "link", text: "Gestión de RRHH", href: "#" },
      { type: "link", text: "Gestión de SUM", href: "#" },
      { type: "link", text: "Gestión de Resoluciones", href: "#" },
    ],
  },
  {
    type: "section",
    text: "Reportes",
    defaultExpanded: false,
    items: [
      { type: "link", text: "Reporte por estudio", href: "#" },
      { type: "link", text: "Reporte por grupo", href: "#" },
      { type: "link", text: "Reporte por proyecto", href: "#" },
      { type: "link", text: "Reporte por docente", href: "#" },
      { type: "link", text: "Consolidado general", href: "#" },
      { type: "link", text: "Consolidado de tesis", href: "#" },
      { type: "link", text: "Reporte de presupuesto", href: "#" },
      { type: "link", text: "Reporte de deudores", href: "#" },
      { type: "link", text: "Lista de deudores", href: "#" },
      { type: "divider" },
      { type: "link", text: "Reporte de publicaciones", href: "#" },
    ],
  },
  {
    type: "section",
    text: "Constancias",
    defaultExpanded: false,
    items: [{ type: "link", text: "Reporte de constancias", href: "#" }],
  },
  {
    type: "section",
    text: "Facultad",
    defaultExpanded: false,
    items: [
      { type: "link", text: "Convocatorias", href: "#" },
      { type: "divider" },
      { type: "link", text: "Usuarios facultad", href: "#" },
      { type: "link", text: "Usuarios evaluadores", href: "#" },
      { type: "link", text: "Asignación de evaluadores", href: "#" },
      { type: "link", text: "Proyectos evaluados", href: "#" },
    ],
  },
  {
    type: "section",
    text: "Admin",
    defaultExpanded: false,
    items: [
      { type: "link", text: "Lineas de investigación", href: "#" },
      { type: "divider" },
      { type: "link", text: "Usuarios administrativos", href: "#" },
      { type: "link", text: "Usuarios investigadores", href: "#" },
      { type: "divider" },
      { type: "link", text: "Asignar temporal", href: "#" },
    ],
  },
];

export default function Sidebar({ activeHref = "#" }) {
  return (
    <SideNavigation
      header={{
        text: "Administrador",
      }}
      activeHref={activeHref}
      items={navItems}
    />
  );
}
