import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
// import ListadoInvestigador from "./tabs/listado";
import Listado from "./tabs/listado";

const breadcrumbs = [
  {
    text: "Facultad",
    href: "/facultad",
  },
  {
    text: "Facultad",
  },
  {
    text: "Listado de PFEX",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Proyectos con Financiamiento Externo"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
