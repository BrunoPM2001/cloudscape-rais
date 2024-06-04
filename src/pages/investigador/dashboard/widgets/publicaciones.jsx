import { Container, Header, PieChart } from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de publicaciones registradas"
        >
          Tipos de publicaciones
        </Header>
      }
      fitHeight={true}
    >
      <PieChart
        fitHeight
        size="large"
        statusType={loading ? "loading" : "finished"}
        data={data}
      />
    </Container>
  );
}
