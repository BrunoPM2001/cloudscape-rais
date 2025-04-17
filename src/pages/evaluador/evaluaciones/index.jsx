import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Evaluador",
    href: "/evaluador",
  },
  {
    text: "Evaluaciones",
  },
  {
    text: "Proyectos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Evaluaciones() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
