import { Container, Header, PieChart } from "@cloudscape-design/components";

export default () => {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos clasificados por tipos"
        >
          Proyectos del presente año en geco
        </Header>
      }
      fitHeight={true}
    >
      <PieChart
        fitHeight
        size="large"
        statusType="loading"
        // data={data}
      />
    </Container>
  );
};
