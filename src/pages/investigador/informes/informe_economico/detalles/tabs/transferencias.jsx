import { Tabs } from "@cloudscape-design/components";
import Solicitud from "./tabs/solicitud";
import Historial from "./tabs/historial";

export default ({ data, loading, reload }) => {
  //  Tabs
  const tabs = [
    {
      id: "solicitud",
      label: "Solicitud",
      content: (
        <Solicitud
          data={data?.solicitud ?? []}
          disponible={data?.habilitado ?? false}
          loading={loading}
          reload={reload}
        />
      ),
    },
    {
      id: "historial",
      label: "Historial",
      content: <Historial data={data?.historial ?? []} loading={loading} />,
    },
  ];

  return <Tabs tabs={tabs} />;
};
