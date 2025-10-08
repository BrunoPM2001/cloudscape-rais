import { Tabs } from "@cloudscape-design/components";
import Info from "../../info";
import Hipotesis from "./hipotesis";
import Introduccion from "./introduccion";
import Metodologia from "./metodologia";
import Exposicion from "./exposicion";
import Interpretacion from "./interpretacion";
import Conclusiones from "./conclusiones";
import Referencias from "./referencias";
import Anexos from "./anexos";
import Recomendaciones from "./recomendaciones";
import Resultados_finales from "./resultados_finales";
import Aplicacion_practica from "./aplicacion_practica";
import Resumen_ejecutivo from "./resumen_ejecutivo";

export default function Con_con_52_tabs({
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
      id: "hipotesis",
      label: "Hipótesis",
      content: (
        <Hipotesis
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "introduccion",
      label: "Introducción",
      content: (
        <Introduccion
          value={formValues?.actividades1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "metodologia",
      label: "Metodología",
      content: (
        <Metodologia
          value={formValues?.actividades2}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "exposicion",
      label: "Exposición",
      content: (
        <Exposicion
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "interpretacion",
      label: "Interpretación",
      content: (
        <Interpretacion
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "conclusiones",
      label: "Conclusiones",
      content: (
        <Conclusiones
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "referencias",
      label: "Referencias",
      content: (
        <Referencias
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "anexos",
      label: "Anexos",
      content: (
        <Anexos
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "recomendaciones",
      label: "Recomendaciones",
      content: (
        <Recomendaciones
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resultados_finales",
      label: "Resultados finales",
      content: (
        <Resultados_finales
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "aplicacion_practica",
      label: "Aplicación práctica",
      content: (
        <Aplicacion_practica
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resumen_ejecutivo",
      label: "Resumen ejecutivo",
      content: (
        <Resumen_ejecutivo
          value={formValues?.resultado_preliminar}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
