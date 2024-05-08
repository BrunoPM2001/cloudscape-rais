import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado.jsx";
import BaseLayout from "../../components/baseLayout.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Admin",
  },
  {
    text: "Usuarios administrativos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Usuarios_administrativos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Usuarios administrativos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap={true}
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de usuarios administrativos" />
      </SpaceBetween>
    </BaseLayout>
  );
}
