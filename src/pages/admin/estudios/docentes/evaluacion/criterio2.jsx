import {
  Badge,
  Box,
  ColumnLayout,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container
      header={
        <SpaceBetween size="xxs" alignItems="center" direction="horizontal">
          <Box variant="h3">D2</Box>
          <Badge color={data.cumple ? "green" : "red"}>
            {data.cumple ? "Sí cumple" : "No cumple"}
          </Badge>
        </SpaceBetween>
      }
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
