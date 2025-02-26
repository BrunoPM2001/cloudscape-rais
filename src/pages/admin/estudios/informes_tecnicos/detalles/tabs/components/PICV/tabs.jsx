import { Tabs } from "@cloudscape-design/components";

import Anexos from "./anexos";
import Info from "./info";

export default function Picv_tabs({
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
      id: "anexos",
      label: "Reporte Final",
      content: (
        <Anexos
          value1={formValues?.file1} //   CATEGORIA = informe-PCONFIGI-INFORME
          handleChange={handleChange}
          files={files}
        />
      ),
    },
   
  ];

  return <Tabs tabs={tabs} />;
}
