import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import Listado from "./tabs/listado.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Constancias",
  },
  {
    text: "Lista de deudores",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Reporte_deudores() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Reporte por investigador"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de proyectos de grupos" />
    </BaseLayout>
  );
}
