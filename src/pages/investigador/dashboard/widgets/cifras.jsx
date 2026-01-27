import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  Spinner,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  const deudas = data?.deudas_vigentes ?? 0;

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
        <div>
          <Box variant="awsui-key-label">Puntaje de los últimos 7 años</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.puntaje_pasado}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Deudas vigentes</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
          <Box variant="awsui-value-large"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Link variant="awsui-value-large" href="/investigador/actividades/deudas">
              {deudas}
            </Link>
            <span style={{ fontSize: "2.0rem", lineHeight: 1, marginLeft: 8 }}>
              {deudas === 0 ? "😊" : "😢"}
            </span>
          </Box>
          )}
        </div>
      </ColumnLayout>
    </Container>
  );
}
