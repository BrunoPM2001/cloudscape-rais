import { SpaceBetween } from "@cloudscape-design/components";
import Detalles from "./detalles.jsx";
import Criterios from "./criterios.jsx";
import BaseLayout from "../../../components/baseLayout";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
    href: "#",
  },
  {
    text: "Gestion de convocatorias",
    href: "../convocatorias",
  },
  {
    text: "Detalle",
    href: "#",
  },
];

export default function Detalle_evaluacion() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Detalle del evaluación:"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <SpaceBetween size="l">
        <Detalles />
        <Criterios />
      </SpaceBetween>
    </BaseLayout>
  );
}
