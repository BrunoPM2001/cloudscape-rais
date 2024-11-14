import { Container, Header, PieChart } from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos clasificados por tipos"
        >
          Proyectos del presente año
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
