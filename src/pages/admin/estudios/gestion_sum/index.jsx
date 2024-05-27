import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
// import ListadoSum from "./tabs/listadoSum";
import BaseLayout from "../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Búsqueda en la base de datos del SUM",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado local",
    content: <Listado />,
  },
  {
    id: "listado_sum",
    label: "Búsqueda en la BD del SUM",
    // content: <ListadoSum />,
  },
];

export default function Gestion_sum() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Publicaciones:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de sum view" />
      </SpaceBetween>
    </BaseLayout>
  );
}
