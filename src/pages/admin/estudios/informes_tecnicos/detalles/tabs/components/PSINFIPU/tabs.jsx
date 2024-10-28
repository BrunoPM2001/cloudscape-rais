import { Tabs } from "@cloudscape-design/components";
import Aportes from "./aportes";
import Impacto from "./impacto";
import Anexos from "./anexos";
import Info from "./info";

export default function Psinfipu_tabs({
  proyecto,
  miembros,
  formValues,
  handleChange,
  files,
}) {
  const tabs = [
    {
      id: "info",
      label: "Info general",
      content: <Info proyecto={proyecto} miembros={miembros} />,
    },
    {
      id: "aportes",
      label: "Aportes",
      content: (
        <Aportes value={formValues?.infinal1} handleChange={handleChange} />
      ),
    },
    {
      id: "impacto",
      label: "Impacto",
      content: (
        <Impacto
          value={formValues?.resumen_ejecutivo}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: "anexo",
      label: "Anexo",
      content: (
        <Anexos
          value1={formValues?.file1} //  CATEGORIA = informe-PSINFIPU-RESULTADOS
          handleChange={handleChange}
          files={files}
        />
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
