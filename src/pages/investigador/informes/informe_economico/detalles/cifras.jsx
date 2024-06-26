import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Icon,
  Link,
  Spinner,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={<Header variant="h2">Cifras generales</Header>}
      fitHeight={true}
    >
      <ColumnLayout columns={3} minColumnWidth={170}>
        <div>
          <Box variant="awsui-key-label">Porcentaje rendido</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              100%
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Comprobantes aprobados</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              <Icon name="file" size="inherit" /> {data.comprobantes}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Transferencias aprobadas</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              <Icon name="check" size="inherit" /> {data.transferencias}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Cantidad de partidas</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              <Icon name="search" size="inherit" /> {data.partidas}
            </Link>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
}
