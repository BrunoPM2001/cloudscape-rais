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
          value={formValues?.infinal11}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "introduccion",
      label: "Introducción",
      content: (
        <Introduccion
          value={formValues?.infinal1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "metodologia",
      label: "Metodología",
      content: (
        <Metodologia
          value={formValues?.infinal2}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "exposicion",
      label: "Exposición",
      content: (
        <Exposicion
          value={formValues?.infinal3}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "interpretacion",
      label: "Interpretación",
      content: (
        <Interpretacion
          value={formValues?.infinal4}
          handleChange={handleChange}
        />
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
      id: "referencias",
      label: "Referencias",
      content: (
        <Referencias
          value={formValues?.infinal6}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "anexos",
      label: "Anexos",
      content: (
        <Anexos
          value={formValues?.infinal7}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "recomendaciones",
      label: "Recomendaciones",
      content: (
        <Recomendaciones
          value={formValues?.infinal8}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resultados_finales",
      label: "Resultados finales",
      content: (
        <Resultados_finales
          value={formValues?.infinal9}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "aplicacion_practica",
      label: "Aplicación práctica",
      content: (
        <Aplicacion_practica
          value={formValues?.infinal10}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resumen_ejecutivo",
      label: "Resumen ejecutivo",
      content: (
        <Resumen_ejecutivo
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
