import BaseLayout from "../../../components/baseLayout";
import Eci from "./components/eci";

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
    href: "../informeAcademico",
  },
  {
    text: "Presentar",
  },
];

export default function Presentar_informe() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Presentar informe académico"
      helpInfo="Formulario para informe académico"
      disableOverlap
    >
      <Eci />
    </BaseLayout>
  );
}
