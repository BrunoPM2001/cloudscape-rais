import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Pendientes from "./tabs/pendientes";
import Aceptados from "./tabs/aceptados";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Informes",
  },
  {
    text: "Informe académico",
  },
];

const tabs = [
  {
    id: "listado_1",
    label: "Informes pendientes",
    content: <Pendientes />,
  },
  {
    id: "listado_2",
    label: "Informes aceptados",
    content: <Aceptados />,
  },
];

export default function Informe_academico() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Proyectos para informe académico"
      helpInfo="Solo aparecerán los proyectos para informe."
      disableOverlap
    >
      <Tabs tabs={tabs} />
    </BaseLayout>
  );
}
