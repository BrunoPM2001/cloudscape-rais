import {
  Badge,
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={<Header variant="h2">Datos de proyecto</Header>}
      fitHeight={true}
    >
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          {loading ? <Spinner /> : <div>{data.titulo}</div>}
        </div>
        <ColumnLayout columns={2} minColumnWidth={120}>
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge color="blue">{data.tipo_proyecto}</Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge color="green">{data.codigo_proyecto}</Badge>
            )}
          </div>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
