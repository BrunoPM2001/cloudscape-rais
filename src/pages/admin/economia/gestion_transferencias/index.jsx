import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Proyectos from "./tabs/proyectos";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Economía",
  },
  {
    text: "Gestión de transferencias",
  },
];

const tabs = [
  {
    id: "proyectos",
    label: "Proyectos",
    content: <Proyectos />,
  },
];

export default function Gestion_transferencias() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Gestión de transferencias"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de comprobantes de proyectos" />
    </BaseLayout>
  );
}
