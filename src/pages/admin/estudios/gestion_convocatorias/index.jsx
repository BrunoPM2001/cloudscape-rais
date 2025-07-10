import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Listado_convocatorias from "./tabs/listado_convocatorias.jsx";
import Listado_evaluaciones from "./tabs/listado_evaluaciones.jsx";
import GrupoPartidas from "./tabs/grupoPartidas.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de convocatorias",
  },
];

const tabs = [
  {
    id: "listado_convocatorias",
    label: "Listado de convocatorias",
    content: <Listado_convocatorias />,
  },
  {
    id: "listado_evaluaciones",
    label: "Lista de evaluaciones",
    content: <Listado_evaluaciones />,
  },
  {
    id: "grupoPartidas",
    label: "Grupo de partidas",
    content: <GrupoPartidas />,
  },
];

export default function Gestion_convocatorias() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Gestión de convocatorias:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de gestión de convocatorias" />
      </SpaceBetween>
    </BaseLayout>
  );
}
