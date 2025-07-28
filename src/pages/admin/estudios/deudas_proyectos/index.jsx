import { Box, SpaceBetween, Tabs } from "@cloudscape-design/components";
import Listado from "./tabs/listado.jsx";
import Generar_deuda from "./tabs/generar_deuda";
import BaseLayout from "../../components/baseLayout.jsx";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Deudas de proyectos",
  },
];

const tabs = [
  {
    id: "listado",
    label: "Listado",
    content: <Listado />,
  },
  {
    id: "generar_deuda",
    label: "Generar deuda",
    content: <Generar_deuda />,
  },
];

export default function Deudas_proyectos() {
  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Deudas de proyectos:"
      helpInfo={
        <>
          <Box variant="h4">Tipos de deuda según proyecto:</Box>
          <Box variant="strong">
            <strong>Deuda Informe Académico</strong>
          </Box>
          <ul>
            <li>PCONFIGI</li>
            <li>PSINFINV</li>
            <li>PSINFIPU</li>
            <li>PINVPOS</li>
            <li>PEVENTO</li>
            <li>ECI</li>
          </ul>
          <Box variant="strong">
            <strong>Deuda Informe Académico Avance</strong>
          </Box>
          <ul>
            <li>PTPGRADO</li>
            <li>PTPMAEST</li>
            <li>PTPDOCTO</li>
          </ul>
          <Box variant="strong">
            <strong>Deuda Informe Académico Final</strong>
          </Box>
          <ul>
            <li>PTPBACHILLER</li>
            <li>PTPGRADO</li>
            <li>PTPMAEST</li>
            <li>PTPDOCTO</li>
          </ul>
          <Box variant="strong">
            <strong>Deuda Segundo Informe Académico Avance</strong>
          </Box>
          <ul>
            <li>PTPDOCTO</li>
          </ul>
        </>
      }
      disableOverlap
      contentType="table"
    >
      <Tabs tabs={tabs} ariaLabel="Opciones de deudas de proyectos" />
    </BaseLayout>
  );
}
