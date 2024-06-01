import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Grupos from "./tabs/grupos.jsx";
import Solicitudes from "./tabs/solicitudes.jsx";
import BaseLayout from "../../components/baseLayout.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Grupos",
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

export default function Grupo() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Grupos de investigación"
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
