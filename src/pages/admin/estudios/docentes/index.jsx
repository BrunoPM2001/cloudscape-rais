import { Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout";
import Solicitudes from "./tabs/solicitudes.jsx";
import Constancias from "./tabs/constancias.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Docente investigador",
  },
];

const tabs = [
  {
    id: "solicitudes",
    label: "Solicitudes",
    content: <Solicitudes />,
  },
  {
    id: "constancias",
    label: "Constancias",
    content: <Constancias />,
  },
];

export default function Docente_investigador() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Docentes investigadores"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de docentes investigador" />
    </BaseLayout>
  );
}
