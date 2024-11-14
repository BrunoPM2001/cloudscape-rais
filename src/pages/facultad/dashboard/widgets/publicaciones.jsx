import { BarChart, Container, Header } from "@cloudscape-design/components";
import { useMemo } from "react";

export default function ({ data, tipos, loading }) {
  // Memoizing el valor de series
  const series = useMemo(
    () =>
      tipos.map((tipo) => ({
        title: tipo.tipo_publicacion,
        type: "bar",
        data: data.map((item) => ({
          x: parseInt(item.periodo),
          y: item[tipo.tipo_publicacion],
        })),
      })),
    [tipos, data]
  );

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de publicaciones registradas los últimos años"
        >
          Publicaciones por periodo
        </Header>
      }
      fitHeight={true}
    >
      <BarChart
        statusType={loading ? "loading" : "finished"}
        fitHeight
        height={150}
        series={series}
        xScaleType="categorical"
        xDomain={data.map((item) => item.periodo)}
        yDomain={[0, 50]}
        xTitle="Periodos"
        yTitle="Cantidad de publicaciones"
      />
    </Container>
  );
}
