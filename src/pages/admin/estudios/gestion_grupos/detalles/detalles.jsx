import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  SpaceBetween,
  Spinner,
  StatusIndicator,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container header={<Header variant="h2">Detalles del grupo</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombre</Box>
            {loading ? <Spinner /> : <div>{data.grupo_nombre}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data.facultad}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Responsable</Box>
            <div>{data.coordinador}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.estado == -1
                    ? "error"
                    : data.estado == 1
                    ? "info"
                    : data.estado == 2
                    ? "stopped"
                    : data.estado == 4
                    ? "success"
                    : data.estado == 5
                    ? "pending"
                    : data.estado == 6
                    ? "in-progress"
                    : "error"
                }
              >
                {data.estado == -1
                  ? "Eliminado"
                  : data.estado == 1
                  ? "Reconocido"
                  : data.estado == 2
                  ? "Observado"
                  : data.estado == 4
                  ? "Registrado"
                  : data.estado == 5
                  ? "Enviado"
                  : data.estado == 6
                  ? "En proceso"
                  : "error"}
              </StatusIndicator>
            )}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Resolución de creación</Box>
            {loading ? (
              <Spinner />
            ) : (
              <div>{data.resolucion_rectoral_creacion}</div>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución de creación</Box>
            {loading ? (
              <Spinner />
            ) : (
              <div>{data.resolucion_creacion_fecha}</div>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Resolución actual</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución actual</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_fecha}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Observaciones</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">
                {data.observaciones}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Observaciones al investigador</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator
                type={
                  data.observaciones_admin == "" ||
                  data.observaciones_admin == null
                    ? "success"
                    : "pending"
                }
              >
                {data.observaciones_admin == "" ||
                data.observaciones_admin == null
                  ? "Ninguna"
                  : data.observaciones_admin}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">
              Resoluciones decanales o constancias
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              <Link
                href={
                  data.infraestructura_sgestion == null
                    ? "#"
                    : data.infraestructura_sgestion
                }
              >
                {data.infraestructura_sgestion == null
                  ? "No hay archivos adjuntos"
                  : "Descargar"}
              </Link>
            )}
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
