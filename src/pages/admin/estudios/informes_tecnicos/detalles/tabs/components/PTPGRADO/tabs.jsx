import { Tabs } from "@cloudscape-design/components";
import Descripcion_actividades from "./descripcion_actividades";
import Evaluacion_global from "./evaluacion_global";
import Medios_probatorios from "./medios_probatorios";
import Porcentaje_avance from "./porcentaje_avance";
import Problemas_identificados from "./problemas_identificados";
import Reporte_meses from "./reporte_meses";
import Describir from "./describir";
import Otros from "./otros";
import Info from "./info";

const Ptpgrado_tabs = ({ proyecto, miembros, formValues, handleChange }) => {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
    },
    {
      id: "reporte_meses",
      label: "Reporte de n° de meses de avance",
      content: (
        <Reporte_meses
          value={formValues?.infinal6}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "descripcion_actividades",
      label: "Descripcion de actividades realizadas",
      content: (
        <Descripcion_actividades
          value={formValues?.infinal1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "porcentaje",
      label: "Porcentaje estimado de avance académico",
      content: (
        <Porcentaje_avance
          value={formValues?.infinal7}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "evaluacion_global",
      label: "Evaluación global de ejecución técnica académica",
      content: (
        <Evaluacion_global
          value={formValues?.infinal3}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "medios_probatorios",
      label: "Medios probatorios",
      content: (
        <Medios_probatorios
          value1={formValues?.file1} //  CATEGORIA = informe-PTPGRADO-INFORME-AVANCE
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "problemas_identificados",
      label: "Problemas identificados",
      content: (
        <Problemas_identificados
          value={formValues?.infinal2}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
};

const Ptpgrado_final_tabs = ({
  proyecto,
  miembros,
  formValues,
  handleChange,
}) => {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
    },
    {
      id: "describir",
      label: "Describir situación",
      content: (
        <Describir value={formValues?.infinal1} handleChange={handleChange} />
      ),
    },
    {
      id: "otros",
      label: "Otros productos de investigación",
      content: (
        <Otros value={formValues?.infinal2} handleChange={handleChange} />
      ),
    },
    {
      id: "medios_probatorios",
      label: "Medios probatorios",
      content: (
        <Medios_probatorios
          value1={formValues?.file1} //  CATEGORIA = informe-PTPGRADO-INFORME-FINAL
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
};

export { Ptpgrado_tabs, Ptpgrado_final_tabs };
