import { Tabs } from "@cloudscape-design/components";
import Aplicacion_practica from "./aplicacion_practica";
import Dificultades from "./dificultades";
import Documentos_adjuntos from "./documentos_adjuntos";
import Funcionamiento from "./funcionamiento";
import Gestion_uso from "./gestion_uso";
import Impacto_uso from "./impacto_uso";
import Proceso_instalacion from "./proceso_instalacion";
import Resumen_ejecutivo from "./resumen_ejecutivo";

export default function Eci_tabs({ formValues, handleChange, files }) {
  const tabs = [
    {
      id: "resumen",
      label: "Resumen",
      content: (
        <Resumen_ejecutivo
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "proceso",
      label: "Proceso de instalación",
      content: (
        <Proceso_instalacion
          value={formValues?.infinal1}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "funcionamiento",
      label: "Funcionamiento",
      content: (
        <Funcionamiento
          value={formValues?.infinal2}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "gestion",
      label: "Gestión del uso",
      content: (
        <Gestion_uso value={formValues?.infinal3} handleChange={handleChange} />
      ),
    },
    {
      id: "aplicacion",
      label: "Aplicación práctica e impacto",
      content: (
        <Aplicacion_practica
          value={formValues?.infinal4}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "impacto",
      label: "Impacto y uso",
      content: (
        <Impacto_uso value={formValues?.infinal5} handleChange={handleChange} />
      ),
    },
    {
      id: "documentos",
      label: "Documentos adjuntos",
      content: (
        <Documentos_adjuntos
          value1={formValues?.file1}
          value2={formValues?.file2}
          value3={formValues?.file3}
          value4={formValues?.file4}
          value5={formValues?.file5}
          value6={formValues?.file6}
          handleChange={handleChange}
          files={files}
        />
        //  CATEGORIA - Hasta 6 anexos anexo1 ... anexo6
      ),
    },
    {
      id: "dificultades",
      label: "Dificultades",
      content: (
        <Dificultades
          value={formValues?.infinal6}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
