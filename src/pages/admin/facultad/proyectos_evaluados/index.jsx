import { Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Facultad",
  },
  {
    text: "Proyectos evaluados",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_evaluados() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Proyectos evaluados"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
