import { BarChart, Container, Header } from "@cloudscape-design/components";

export default function ({ data, tipos, loading }) {
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
        series={tipos.map((tipo) => ({
          title: tipo.tipo,
          type: "bar",
          data: data.map((item) => ({
            x: parseInt(item.periodo),
            y: item[tipo.tipo],
          })),
        }))}
        xScaleType="categorical"
        xDomain={data.map((item) => item.periodo)}
        yDomain={[0, 3000]}
        xTitle="Periodos"
        yTitle="Cantidad de publicaciones"
      />
    </Container>
  );
}
