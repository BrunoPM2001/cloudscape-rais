import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Facultad",
    href: "/facultad",
  },
  {
    text: "Facultad",
  },
  {
    text: "Listado de Informes Académicos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Informes Académicos"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
