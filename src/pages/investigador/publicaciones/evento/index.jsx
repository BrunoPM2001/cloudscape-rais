import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Resumen de evento científico",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Eventos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Resumen de evento científico"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
