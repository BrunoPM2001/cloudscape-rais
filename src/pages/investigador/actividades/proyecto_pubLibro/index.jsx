import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Actividades",
  },
  {
    text: "Concurso para la publicación de libros universitarios",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
];

export default function Proyectos_pubLibro() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Deudas de proyectos:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs
          tabs={tabs}
          ariaLabel="Ventanas de concurso para publicación de libros"
        />
      </SpaceBetween>
    </BaseLayout>
  );
}
