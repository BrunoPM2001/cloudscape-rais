import { Tabs } from "@cloudscape-design/components";
import Asistencia from "./asistencia";
import Conclusiones from "./conclusiones";
import Objetivos from "./objetivos";
import Programa_taller from "./programa_taller";
import Recomendaciones from "./recomendaciones";
import Info from "./info";

export default function Pinvpost_tabs({
  proyecto,
  miembros,
  formValues,
  handleChange,
}) {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
    },
    {
      id: "objetivos",
      label: "Objetivos",
      content: (
        <Objetivos
          value={formValues?.objetivos_taller}
          handleChange={handleChange}
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
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
