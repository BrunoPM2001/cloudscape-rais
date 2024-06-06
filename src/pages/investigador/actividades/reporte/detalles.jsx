import {
  Badge,
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Imprimir presupuesto</Button>
              <Button variant="primary">Imprimir reporte</Button>
            </SpaceBetween>
          }
        >
          Datos generales
        </Header>
      }
    >
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{data.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge
                color={
                  data.estado == -1
                    ? "red"
                    : data.estado == 0
                    ? "grey"
                    : data.estado == 1
                    ? "green"
                    : data.estado == 2
                    ? "grey"
                    : data.estado == 3
                    ? "grey"
                    : data.estado == 5
                    ? "blue"
                    : data.estado == 5
                    ? "blue"
                    : data.estado == 6
                    ? "grey"
                    : "red"
                }
              >
                {data.estado == -1
                  ? "Eliminado"
                  : data.estado == 0
                  ? "No aprobado"
                  : data.estado == 1
                  ? "Aprobado"
                  : data.estado == 2
                  ? "Observado"
                  : data.estado == 3
                  ? "En evaluación"
                  : data.estado == 5
                  ? "Enviado"
                  : data.estado == 6
                  ? "En proceso"
                  : "Error"}
              </Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Periodo</Box>
            {loading ? <Spinner /> : <div>{data.periodo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Tipo de investigación</Box>
            {loading ? <Spinner /> : <div>{data.tipo_investigacion}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{data.titulo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Monto</Box>
            {loading ? <Spinner /> : <div>{data.monto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data.facultad}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Línea de investigación</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">
                {data.linea_investigacion}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de inscripción</Box>
            {loading ? <Spinner /> : <div>{data.fecha_inscripcion}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Resolución</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Grupo</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
