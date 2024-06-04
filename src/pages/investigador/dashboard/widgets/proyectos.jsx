import { BarChart, Container, Header } from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos en los que participó"
        >
          Tipos de proyecto
        </Header>
      }
      fitHeight={true}
    >
      <BarChart
        statusType={loading ? "loading" : "finished"}
        fitHeight
        height={150}
        series={[
          {
            title: "Tipo de proyecto",
            type: "bar",
            data: data.map((item) => ({
              x: item.title,
              y: parseInt(item.cuenta),
            })),
          },
        ]}
        xScaleType="categorical"
        xDomain={data.map((item) => item.title)}
        yDomain={[0, 20]}
        xTitle="Tipos de proyecto"
        yTitle="Cantidad de proyectos"
      />
    </Container>
  );
}
