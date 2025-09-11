import { SpaceBetween, Tabs } from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto con financiamiento",
  },
];

export default function Convocatoria_registro() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      Working on it!
      {/* <Tabs tabs={tabs} /> */}
    </BaseLayout>
  );
}
