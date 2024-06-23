import { Tabs } from "@cloudscape-design/components";
import Objetivos from "./components/objetivos";
import Programa_taller from "./components/programa_taller";
import Conclusiones from "./components/conclusiones";
import Recomendaciones from "./components/recomendaciones";
import Asistencia from "./components/asistencia";

export default ({ tipo_proyecto, formValues, handleChange, loading }) => {
  //  Tabs
  const pinvpos = [
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

  return (
    <>
      {tipo_proyecto == "PINVPOST" ? (
        <Tabs tabs={pinvpos} />
      ) : (
        <Tabs tabs={pinvpos} />
      )}
    </>
  );
};
