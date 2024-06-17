import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

export default ({ proyecto, solicitud, loading }) => {
  return (
    <Grid
      gridDefinition={[
        {
          colspan: {
            default: 12,
            xl: 4,
            l: 4,
            m: 4,
            s: 4,
            xs: 4,
          },
        },
        {
          colspan: {
            default: 12,
            xl: 8,
            l: 8,
            m: 8,
            s: 8,
            xs: 8,
          },
        },
      ]}
    >
      <Container
        header={<Header variant="h2">Detalles del proyecto</Header>}
        fitHeight
      >
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{proyecto.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{proyecto.titulo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código de proyecto</Box>
            {loading ? <Spinner /> : <div>{proyecto.codigo_proyecto}</div>}
          </div>
        </SpaceBetween>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button>Reporte</Button>
                <Button variant="primary">Calificar</Button>
              </SpaceBetween>
            }
          >
            Última solicitud
          </Header>
        }
        fitHeight
      >
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Justificación</Box>
            {loading ? <Spinner /> : <div>{solicitud.justificacion}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge
                color={
                  solicitud.estado == 1
                    ? "green"
                    : solicitud.estado == 20
                    ? "red"
                    : solicitud.estado == 30
                    ? "blue"
                    : "red"
                }
              >
                {solicitud.estado == 1
                  ? "Aprobado"
                  : solicitud.estado == 20
                  ? "Rechazado"
                  : solicitud.estado == 30
                  ? "Nueva transferencia"
                  : solicitud.estado}
              </Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de solicitud</Box>
            {loading ? <Spinner /> : <div>{solicitud.created_at}</div>}
          </div>
        </SpaceBetween>
      </Container>
    </Grid>
  );
};
