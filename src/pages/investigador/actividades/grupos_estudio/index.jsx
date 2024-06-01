import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Grupos de estudio",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Grupos_estudio() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Deudas de proyectos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs
          tabs={tabs}
          ariaLabel="Ventanas de proyectos de grupo de estudio"
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
