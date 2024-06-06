import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Inicio from "./tabs/inicio";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Economía",
  },
  {
    text: "Gestión de grupos",
  },
];

const tabs = [
  {
    id: "inicio",
    label: "Inicio",
    content: <Inicio />,
  },
  {
    id: "solicitudes",
    label: "Solicitudes",
    // content: <Solicitudes />,
  },
];

export default function Gestion_comprobantes() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Gestión de comprobantes:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de grupos de investigación" />
    </BaseLayout>
  );
}
