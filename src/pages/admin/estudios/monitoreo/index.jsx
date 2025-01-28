import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import Metas from "./tabs/metas";
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
    text: "Monitoreo",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "configuracion_metas",
    label: "Configuración de metas",
    content: <Metas />,
  },
];

export default function Monitoreo() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Monitoreo:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <SpaceBetween size="l">
        <Tabs tabs={tabs} ariaLabel="Opciones de monitoreo" />
      </SpaceBetween>
    </BaseLayout>
  );
}
