import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado.jsx";
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
    text: "Asignar evaluadores",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Asignar_evaluador() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Asignar evaluadores:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} />
      </SpaceBetween>
    </BaseLayout>
  );
}
