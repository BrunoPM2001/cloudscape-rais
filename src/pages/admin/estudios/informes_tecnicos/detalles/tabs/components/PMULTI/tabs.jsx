import { Tabs } from "@cloudscape-design/components";
import Resumen from "./resumen";
import Palabras_clave from "./palabras_clave";
import Introduccion from "./introduccion";
import Metodologias from "./metodologias";
import Resultados from "./resultados";
import Discusion from "./discusion";
import Conclusiones from "./conclusiones";
import Recomendaciones from "./recomendaciones";
import Referencias from "./referencias";
import Anexos from "./anexos";
import Aplicacion from "./aplicacion";
import Publicacion from "./publicacion";
import Calendario from "./calendario";

export default function Pmulti_tabs({
  formValues,
  handleChange,
  actividades,
  files,
  reload,
}) {
  const tabs = [
    {
      id: "resumen",
      label: "Resumen",
      content: (
        <Resumen
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "palabras",
      label: "Palabras clave",
      content: (
        <Palabras_clave
          value={formValues?.palabras_clave}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "intro",
      label: "Introduccción",
      content: (
        <Introduccion
          value={formValues?.infinal1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "metodologias",
      label: "Metodologías",
      content: (
        <Metodologias
          value={formValues?.infinal2}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "resultados",
      label: "Resultados",
      content: (
        <Resultados value={formValues?.infinal3} handleChange={handleChange} />
      ),
    },
    {
      id: "discusion",
      label: "Discusión",
      content: (
        <Discusion value={formValues?.infinal4} handleChange={handleChange} />
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
      id: "recomendaciones",
      label: "Recomendaciones",
      content: (
        <Recomendaciones
          value={formValues?.infinal6}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "referencias",
      label: "Referencias bibliográficas",
      content: (
        <Referencias value={formValues?.infinal7} handleChange={handleChange} />
      ),
    },
    {
      id: "anexos",
      label: "Anexos",
      content: (
        <Anexos
          value1={formValues?.file1} //  CATEGORIA = informe-PMULTI-INFORME
          value2={formValues?.file10}
          handleChange={handleChange}
          files={files}
        />
      ),
    },
    {
      id: "aplicacion",
      label: "Aplicación práctica e impacto",
      content: (
        <Aplicacion value={formValues?.infinal9} handleChange={handleChange} />
      ),
    },
    {
      id: "publicacion",
      label: "Publicación",
      content: (
        <Publicacion
          value={formValues?.infinal10}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "calendario",
      label: "Calendario",
      content: <Calendario data={actividades} files={files} reload={reload} />,
    },
    //  TODO - Implementar las últimas dos tabs (flojera)
  ];

  return <Tabs tabs={tabs} />;
}
