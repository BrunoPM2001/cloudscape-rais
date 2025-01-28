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
    text: "Monitoreo",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Monitoreo() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Metas para proyectos"
      helpInfo="Listado de proyectos con metas por cumplir."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
