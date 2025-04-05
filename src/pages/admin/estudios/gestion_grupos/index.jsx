import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Grupos from "./tabs/grupos";
import Solicitudes from "./tabs/solicitudes";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de grupos",
  },
];

const tabs = [
  {
    id: "grupos",
    label: "Grupos",
    content: <Grupos />,
  },
  {
    id: "solicitudes",
    label: "Solicitudes",
    content: <Solicitudes />,
  },
];

export default function Gestion_grupos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Grupos de investigación"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de grupos de investigación" />
      </SpaceBetween>
    </BaseLayout>
  );
}
