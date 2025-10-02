import { Tabs } from "@cloudscape-design/components";
import Info from "../../info";
import Breve_descripcion from "./breve_descripcion";
import Actividades_profesores from "./actividades_profesores";
import Actividades_alumnos from "./actividades_alumnos";
import Resultado_preliminar from "./resultado_preliminar";

export default function Con_con_51_tabs({
  proyecto,
  formValues,
  handleChange,
}) {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} />,
    },
    {
      id: "breve_descripcion",
      label: "Breve descripción",
      content: (
        <Breve_descripcion
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "actividades_profesores",
      label: "Actividades profesores",
      content: (
        <Actividades_profesores
          value={formValues?.actividades1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "actividades_alumnos",
      label: "Actividades alumnos",
      content: (
        <Actividades_alumnos
          value={formValues?.actividades2}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resultado_preliminar",
      label: "Resultado preliminar",
      content: (
        <Resultado_preliminar
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
