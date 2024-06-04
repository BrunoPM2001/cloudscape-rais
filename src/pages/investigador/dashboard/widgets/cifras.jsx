import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  Spinner,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de registros de algunas tablas"
        >
          Cifras generales
        </Header>
      }
      fitHeight={true}
    >
      <ColumnLayout columns={4} minColumnWidth={170}>
        <div>
          <Box variant="awsui-key-label">Grupos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.grupos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.proyectos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Publicaciones</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.publicaciones}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Puntaje global</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.puntaje}
            </Link>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
}
