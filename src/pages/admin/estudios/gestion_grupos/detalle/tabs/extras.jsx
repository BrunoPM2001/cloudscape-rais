import {
  Link,
  Container,
  ColumnLayout,
  Header,
  Box,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container header={<Header variant="h2">Extras</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Ambientes físicos</Box>
          {loading ? <Spinner /> : <div>{data.infraestructura_ambientes}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">
            Resoluciones decanales o constancias
          </Box>
          {loading ? <Spinner /> : <Link>{data.grupo_nombre}</Link>}
        </div>
      </ColumnLayout>
    </Container>
  );
};
