import { Tabs } from "@cloudscape-design/components";
import Asistencia from "./asistencia";
import Conclusiones from "./conclusiones";
import Objetivos from "./objetivos";
import Programa_taller from "./programa_taller";
import Recomendaciones from "./recomendaciones";

export default function Pinvpost_tabs({ formValues, handleChange }) {
  const tabs = [
    {
      id: "objetivos",
      label: "Objetivos",
      content: (
        <Objetivos
          value={formValues?.objetivos_taller}
          handleChange={handleChange}
          loading={loading}
        />
      ),
    },
    {
      id: "programa_taller",
      label: "Programa taller",
      content: (
        <Programa_taller
          value1={formValues?.fecha_evento}
          value2={formValues?.propuestas_taller}
          handleChange={handleChange}
          loading={loading}
        />
      ),
    },
    {
      id: "conclusiones",
      label: "Conclusiones",
      content: (
        <Conclusiones
          value={formValues?.conclusion_taller}
          handleChange={handleChange}
          loading={loading}
        />
      ),
    },
    {
      id: "recomendaciones",
      label: "Recomendaciones",
      content: (
        <Recomendaciones
          value={formValues?.recomendacion_taller}
          handleChange={handleChange}
          loading={loading}
        />
      ),
    },
    {
      id: "asistencia",
      label: "Asistencia",
      content: (
        <Asistencia
          value={formValues?.asistencia_taller}
          handleChange={handleChange}
          loading={loading}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
