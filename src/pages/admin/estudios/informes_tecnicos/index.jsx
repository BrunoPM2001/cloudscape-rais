import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Informes técnicos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Informes_tecnicos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Informes técnicos"
      helpInfo="Solo se listan los proyectos que tengan como mínimo un informe técnico."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de informes técnicos" />
    </BaseLayout>
  );
}
