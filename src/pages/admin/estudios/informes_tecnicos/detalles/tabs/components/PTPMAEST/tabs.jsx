import { Tabs } from "@cloudscape-design/components";
import Descripcion_actividades from "./descripcion_actividades";
import Evaluacion_global from "./evaluacion_global";
import Porcentaje_avance from "./porcentaje_avance";
import Problemas_identificados from "./problemas_identificados";
import Anexos from "./anexos";
import Resultados from "./resultados";
import Info from "./info";

const Ptpmaest_tabs = ({
  proyecto,
  miembros,
  formValues,
  handleChange,
  files,
}) => {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
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
      id: "descripcion_actividades",
      label: "Descripción de actividades realizadas",
      content: (
        <Descripcion_actividades
          value1={formValues?.infinal1}
          file1={formValues?.file1}
          handleChange={handleChange}
          files={files}
        />
      ),
    },
    {
      id: "evaluacion_global",
      label: "Evaluación global de ejecución académica",
      content: (
        <Evaluacion_global
          value={formValues?.infinal3}
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

const Ptpmaest_final_tabs = ({
  proyecto,
  miembros,
  formValues,
  handleChange,
  files,
}) => {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
    },
    {
      id: "entregables",
      label: "Entregables",
      content: (
        <Anexos
          value1={formValues?.file1} //  CATEGORIA = informe-PTPMAEST-INFORME-FINAL-tesis
          value2={formValues?.file2} //  CATEGORIA = informe-PTPMAEST-INFORME-FINAL-acta
          handleChange={handleChange}
          files={files}
        />
      ),
    },
    {
      id: "resultados",
      label: "Resultados indirectos",
      content: (
        <Resultados value={formValues?.infinal1} handleChange={handleChange} />
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

export { Ptpmaest_tabs, Ptpmaest_final_tabs };
