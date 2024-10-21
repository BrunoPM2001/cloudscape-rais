import { useLocation } from "react-router-dom";
import BaseLayout from "../../../components/baseLayout";
import Eci from "./components/eci";
import Pconfigi from "./components/pconfigi";
import queryString from "query-string";
import Pconfigi_inv from "./components/pconfigi_inv";
import Pevento from "./components/pevento";
import Pinterdis from "./components/pinterdis";
import Pmulti from "./components/pmulti";
import Pinvpos from "./components/pinvpos";
import Psinfinv from "./components/psinfinv";
import Psinfipu from "./components/psinfipu";
import Ptpbachiller from "./components/ptpbachiller";
import Ptpdocto1 from "./components/ptpdocto1";
import Ptpdocto2 from "./components/ptpdocto2";
import Ptpdocto3 from "./components/ptpdocto3";

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
  const { tipo_proyecto, informe } = queryString.parse(location.search);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Presentar informe académico"
      helpInfo="Formulario para informe académico"
      disableOverlap
    >
      {tipo_proyecto == "PCONFIGI" ? (
        <Pconfigi />
      ) : tipo_proyecto == "ECI" ? (
        <Eci />
      ) : tipo_proyecto == "PCONFIGI-INV" ? (
        <Pconfigi_inv />
      ) : tipo_proyecto == "PEVENTO" ? (
        <Pevento />
      ) : tipo_proyecto == "PINTERDIS" ? (
        <Pinterdis />
      ) : tipo_proyecto == "PINVPOS" ? (
        <Pinvpos />
      ) : tipo_proyecto == "PSINFINV" ? (
        <Psinfinv />
      ) : tipo_proyecto == "PSINFIPU" ? (
        <Psinfipu />
      ) : tipo_proyecto == "PTPBACHILLER" ? (
        <Ptpbachiller />
      ) : tipo_proyecto == "PTPDOCTO" ? (
        <>
          {informe == "Informe académico de avance" ? (
            <Ptpdocto1 />
          ) : informe == "Segundo informe académico de avance" ? (
            <Ptpdocto2 />
          ) : (
            informe == "Informe académico final" && <Ptpdocto3 />
          )}
        </>
      ) : (
        tipo_proyecto == "PMULTI" && <Pmulti />
      )}
    </BaseLayout>
  );
}
