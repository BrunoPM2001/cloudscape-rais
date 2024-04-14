import {
  Box,
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
      header={<Header variant="h2">Detalles del proyecto de grupo</Header>}
    >
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Título</Box>
            {loading ? <Spinner /> : <div>{data.titulo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? <Spinner /> : <div>{data.codigo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Tipo de proyecto</Box>
            <div>{data.tipo_proyecto}</div>
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
            <Box variant="awsui-key-label">Fecha de inicio</Box>
            {loading ? <Spinner /> : <div>{data.fecha_inicio}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de fin</Box>
            {loading ? <Spinner /> : <div>{data.fecha_fin}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Resolución rectoral</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución rectoral</Box>
            {loading ? <Spinner /> : <div>{data.resolucion_fecha}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Comentarios</Box>
            {loading ? (
              <Spinner />
            ) : (
              <StatusIndicator type="info">
                {data.comentarios == "" || data.comentarios == null
                  ? "Ninguno"
                  : data.comentarios}
              </StatusIndicator>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Observaciones</Box>
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
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
