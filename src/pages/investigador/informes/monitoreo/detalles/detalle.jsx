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
      header={
        <Header
          variant="h2"
          info={
            <>
              {data && (
                <Badge
                  color={
                    data.estado_meta == "Por presentar"
                      ? "grey"
                      : data.estado_meta == "No aprobado"
                      ? "red"
                      : data.estado_meta == "Aprobado"
                      ? "green"
                      : data.estado_meta == "Observado"
                      ? "severity-medium"
                      : data.estado_meta == "Enviado"
                      ? "blue"
                      : data.estado_meta == "En proceso"
                      ? "severity-low"
                      : "red"
                  }
                >
                  {data.estado_meta}
                </Badge>
              )}
            </>
          }
        >
          Datos de proyecto
        </Header>
      }
      fitHeight={true}
    >
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          {loading ? <Spinner /> : <div>{data?.titulo}</div>}
        </div>
        <ColumnLayout columns={2} minColumnWidth={120}>
          <div>
            <Box variant="awsui-key-label">Tipo</Box>
            {loading ? <Spinner /> : <div>{data?.tipo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código</Box>
            {loading ? <Spinner /> : <div>{data?.codigo_proyecto}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Responsable</Box>
            {loading ? <Spinner /> : <div>{data?.responsable}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Badge color="green">{data?.estado}</Badge>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Año</Box>
            {loading ? <Spinner /> : <div>{data?.periodo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data?.facultad}</div>}
          </div>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
