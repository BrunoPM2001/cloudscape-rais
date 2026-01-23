import { Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado";
import Bd_indizacion from "./tabs/bd_indizacion";
import Bd_wos from "./tabs/bd_wos";
import BaseLayout from "../../components/baseLayout";
import Solicitudes_editor from "./tabs/solicitudes_editor";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Revistas",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "bd_indizacion",
    label: "Base de datos de indización",
    content: <Bd_indizacion />,
  },
  {
    id: "bd_wos",
    label: "Base de datos WOS",
    content: <Bd_wos />,
  },
  {
    id: "editores",
    label: "Editores",
    content: <Solicitudes_editor />,
  },
];

export default function Revistas() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Revistas"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de revistas" />
    </BaseLayout>
  );
}
