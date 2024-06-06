import { Container, Header, LineChart } from "@cloudscape-design/components";
import { useMemo } from "react";

export default function ({ data, tipos, loading }) {
  const series = useMemo(
    () =>
      tipos.map((tipo) => ({
        title: tipo.tipo_proyecto,
        type: "line",
        data: data.map((item) => ({
          x: parseInt(item.periodo),
          y: item[tipo.tipo_proyecto],
        })),
      })),
    [tipos, data]
  );
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos clasificados por tipos"
        >
          Proyectos a lo largo del tiempo
        </Header>
      }
      fitHeight={true}
    >
      <LineChart
        statusType={loading ? "loading" : "finished"}
        fitHeight
        height={200}
        series={series}
        xScaleType="categorical"
        xDomain={[2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]}
        yDomain={[0, 600]}
        xTitle="Periodo"
        yTitle="Cantidad de proyectos"
      />
    </Container>
  );
}
