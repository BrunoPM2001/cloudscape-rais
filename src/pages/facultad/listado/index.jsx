import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../components/baseLayout";
//  import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Facultad",
    href: "/facultad",
  },
  {
    text: "Facultad",
  },
  {
    text: "Listado",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: "Listado Facultad",
  },
];

export default function Listado() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Listado de proyectos"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
