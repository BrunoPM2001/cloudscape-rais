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
    text: "Convocatorias",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Convocatorias() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Convocatorias de proyectos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de convocatorias" />
      </SpaceBetween>
    </BaseLayout>
  );
}
