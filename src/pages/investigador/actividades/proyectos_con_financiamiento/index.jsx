import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado.jsx";
import BaseLayout from "../../components/baseLayout.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Proyectos con financiamiento",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_con_financiamiento() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <SpaceBetween size="l">
        <Tabs
          tabs={tabs}
          ariaLabel="Ventanas de proyectos con fondos monetarios"
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
