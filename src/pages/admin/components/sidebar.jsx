import { Badge, SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    type: "section",
    text: "Estudios",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Gestión de convocatorias",
        href: "/admin/estudios/convocatorias",
      },
      { type: "divider" },
      {
        type: "link",
        text: "Gestión de grupos",
        href: "/admin/estudios/grupos",
      },
      {
        type: "link",
        text: "Gestión de proyectos de grupos",
        href: "/admin/estudios/proyectos_grupos",
      },
      {
        type: "link",
        text: "Gestión de proyectos FEX",
        href: "/admin/estudios/proyectos_fex",
      },
      { type: "link", text: "Gestión de proyectos", href: "#" },
      {
        type: "link",
        text: "Informes técnicos",
        href: "/admin/estudios/informes_tecnicos",
      },
      { type: "link", text: "Monitoreo", href: "/admin/estudios/monitoreo" },
      {
        type: "link",
        text: "Deuda de proyectos",
        href: "/admin/estudios/deudas_proyectos",
      },
      { type: "divider" },
      {
        type: "link",
        text: "Gestión de publicaciones",
        href: "/admin/estudios/gestion_publicaciones",
      },
      { type: "link", text: "Sincronizar publicaciones", href: "#" },
      { type: "link", text: "Revistas", href: "/admin/estudios/revistas" },
      {
        type: "link",
        text: "Gestión de laboratorios",
        href: "/admin/estudios/laboratorios",
      },
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
      {
        type: "link",
        text: "Reporte por estudio",
        href: "/admin/reportes/estudio",
      },
      {
        type: "link",
        text: "Reporte por grupo",
        href: "/admin/reportes/grupo",
      },
      {
        type: "link",
        text: "Reporte por proyecto",
        href: "/admin/reportes/proyecto",
      },
      {
        type: "link",
        text: "Reporte por investigador",
        href: "/admin/reportes/investigador",
      },
      {
        type: "link",
        text: "Consolidado general",
        href: "/admin/reportes/consolidado_general",
      },
      { type: "link", text: "Consolidado de tesis", href: "#" },
      {
        type: "link",
        text: "Reporte de presupuesto",
        href: "/admin/reportes/presupuesto",
      },
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
    items: [
      {
        type: "link",
        text: "Reporte de constancias",
        href: "/admin/constancias",
      },
    ],
  },
  {
    type: "section",
    text: "Facultad",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Convocatorias",
        href: "/admin/facultad/convocatorias",
        info: <Badge color="blue">Histórico</Badge>,
      },
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
      {
        type: "link",
        text: "Lineas de investigación",
        href: "/admin/admin/lineas",
      },
      { type: "divider" },
      {
        type: "link",
        text: "Usuarios administrativos",
        href: "/admin/admin/usuarios_administrativos",
      },
      {
        type: "link",
        text: "Usuarios investigadores",
        href: "/admin/admin/usuarios_investigadores",
      },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <SideNavigation
      header={{
        text: "Administrador",
        href: "/admin",
      }}
      activeHref={location.pathname}
      items={navItems}
    />
  );
}
