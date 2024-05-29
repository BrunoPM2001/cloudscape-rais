import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de investigadores",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Gestion_grupos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Gestión de investigadores:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de usuarios investigadores" />
      </SpaceBetween>
    </BaseLayout>
  );
}
