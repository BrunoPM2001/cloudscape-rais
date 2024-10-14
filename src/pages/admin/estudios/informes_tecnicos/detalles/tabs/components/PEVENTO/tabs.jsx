import { Tabs } from "@cloudscape-design/components";
import Objetivos from "./objetivos";
import Comite from "./comite";
import Programa from "./programa";
import Descripcion from "./descripcion";
import Conclusiones from "./conclusiones";
import Reporte from "./reporte";

export default function Pevento_tabs({ formValues, handleChange }) {
  const tabs = [
    {
      id: "objetivos",
      label: "Objetivos y metas",
      content: (
        <Objetivos value={formValues?.infinal1} handleChange={handleChange} />
      ),
    },
    {
      id: "comite",
      label: "Comité organizador",
      content: (
        <Comite value={formValues?.infinal2} handleChange={handleChange} />
      ),
    },
    {
      id: "programa",
      label: "Programa del evento",
      content: (
        <Programa value={formValues?.infinal3} handleChange={handleChange} />
      ),
    },
    {
      id: "descripcion",
      label: "Descripción del evento",
      content: (
        <Descripcion value={formValues?.infinal4} handleChange={handleChange} />
      ),
    },
    {
      id: "conclusiones",
      label: "Conclusiones",
      content: (
        <Conclusiones
          value={formValues?.infinal5}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "reporte",
      label: "Reporte de asistencia",
      content: (
        <Reporte value={formValues?.infinal6} handleChange={handleChange} />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
