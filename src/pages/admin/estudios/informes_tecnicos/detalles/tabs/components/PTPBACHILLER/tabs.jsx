import { Tabs } from "@cloudscape-design/components";
import Producto from "./producto";
import Informe from "./informe";
import Otros from "./otros";
import Anexos from "./anexos";
import Problema from "./problema";
import Acciones from "./acciones";
import Sugerencias from "./sugerencias";

export default function Ptpbachiller_tabs({ formValues, handleChange, files }) {
  const tabs = [
    {
      id: "producto",
      label: "Producto de investigación",
      content: (
        <Producto
          value={formValues?.estado_trabajo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "informe",
      label: "Informe de trabajo de investigación",
      content: (
        <Informe value={formValues?.infinal10} handleChange={handleChange} />
      ),
    },
    {
      id: "otros",
      label: "Otros productos de investigación",
      content: (
        <Otros value={formValues?.infinal9} handleChange={handleChange} />
      ),
    },
    {
      id: "incluir",
      label: "Incluir medio de comprobación",
      content: (
        <Anexos
          value1={formValues?.file1} //  CATEGORIA = informe-PTPBACHILLER-INFORME
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "problema",
      label: "Descripción del problema",
      content: (
        <Problema value={formValues?.infinal3} handleChange={handleChange} />
      ),
    },
    {
      id: "acciones",
      label: "Acciones tomadas",
      content: (
        <Acciones value={formValues?.infinal4} handleChange={handleChange} />
      ),
    },
    {
      id: "sugerencias",
      label: "Sugerencias",
      content: (
        <Sugerencias value={formValues?.infinal5} handleChange={handleChange} />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
