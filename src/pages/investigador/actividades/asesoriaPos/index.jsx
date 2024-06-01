import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Asesoría de tesis de posgrado",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Asesoria_posgrado() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Deudas de proyectos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Ventanas de asesoría de posgrado" />
      </SpaceBetween>
    </BaseLayout>
  );
}
