import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import Bd_indizacion from "./tabs/bd_indizacion";
import Bd_wos from "./tabs/bd_wos";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Revistas",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "bd_indizacion",
    label: "Base de datos de indización",
    content: <Bd_indizacion />,
  },
  {
    id: "bd_wos",
    label: "Base de datos WOS",
    content: <Bd_wos />,
  },
];

export default function Revistas() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Revistas:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de revistas" />
      </SpaceBetween>
    </BaseLayout>
  );
}
