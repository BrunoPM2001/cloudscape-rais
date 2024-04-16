import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
} from "@cloudscape-design/components";

export default function () {
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
      <ColumnLayout columns={3} variant="text-grid" minColumnWidth={170}>
        <div>
          <Box variant="awsui-key-label">Grupos de investigación</Box>
          <Link variant="awsui-value-large" href="#">
            385
          </Link>
        </div>
        <div>
          <Box variant="awsui-key-label">Investigadores registrados</Box>
          <Link variant="awsui-value-large" href="#">
            31511
          </Link>
        </div>
        <div>
          <Box variant="awsui-key-label">Publicaciones</Box>
          <Link variant="awsui-value-large" href="#">
            58800
          </Link>
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos desde el 2017</Box>
          <Link variant="awsui-value-large" href="#">
            7117
          </Link>
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos antes del 2017</Box>
          <Link variant="awsui-value-large" href="#">
            7117
          </Link>
        </div>
      </ColumnLayout>
    </Container>
  );
}
