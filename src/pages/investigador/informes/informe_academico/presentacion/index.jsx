import { useLocation } from "react-router-dom";
import BaseLayout from "../../../components/baseLayout";
import Eci from "./components/eci";
import Pconfigi from "./components/pconfigi";
import queryString from "query-string";

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
  //  Url
  const location = useLocation();
  const { tipo_proyecto } = queryString.parse(location.search);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Presentar informe académico"
      helpInfo="Formulario para informe académico"
      disableOverlap
    >
      {tipo_proyecto == "PCONFIGI" ? (
        <Pconfigi />
      ) : (
        tipo_proyecto == "ECI" && <Eci />
      )}
    </BaseLayout>
  );
}
