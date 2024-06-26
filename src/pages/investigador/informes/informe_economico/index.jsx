import { Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Informes",
  },
  {
    text: "Informe económico",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Informe_economico() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Proyectos para informe económico"
      helpInfo="Solo aparecerán los proyectos aprobados con resolución y con permiso de sustento económico."
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
