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
    text: "Proyectos multidisciplinarios",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_multi() {
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
          ariaLabel="Ventanas de proyectos multidisciplinarios"
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
