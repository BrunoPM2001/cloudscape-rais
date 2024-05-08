import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado.jsx";
import Nuevo from "./tabs/nuevo.jsx";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Admin",
  },
  {
    text: "Líneas de investigación",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "nuevo",
    label: "Nuevo",
    content: <Nuevo />,
  },
];

export default function Lineas_investigacion() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Líneas de investigación:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de líneas" />
      </SpaceBetween>
    </BaseLayout>
  );
}
