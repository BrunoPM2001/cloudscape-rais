import {
  Badge,
  Box,
  ColumnLayout,
  Container,
  Header,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Badge color={data.cumple ? "green" : "red"}>
              {data.cumple ? "Sí cumple" : "No cumple"}
            </Badge>
          }
        >
          D2
        </Header>
      }
      fitHeight
    >
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Grupo</Box>
          <div>{data.grupo_nombre}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Tipo de integrante</Box>
          <div>{data.condicion}</div>
        </div>
      </ColumnLayout>
    </Container>
  );
};
