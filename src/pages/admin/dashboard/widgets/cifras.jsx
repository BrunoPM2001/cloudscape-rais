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
      <ColumnLayout columns={3} minColumnWidth={170}>
        <div>
          <Box variant="awsui-key-label">Grupos de investigación</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.grupos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Investigadores</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.investigadores}
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
          <Box variant="awsui-key-label">Proyectos desde el 2017</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.proyectos}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos antes del 2017</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.proyectosPasados}
            </Link>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
}
