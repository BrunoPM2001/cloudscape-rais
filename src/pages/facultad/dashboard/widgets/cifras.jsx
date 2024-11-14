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
          <Box variant="awsui-key-label">Proyectos con Fondos Monetarios</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalConFinanciamiento}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos con Fondos No Monetarios</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalSinFinanciamiento}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos con Fondos Externos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalFinanciamientoExterno}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Asesoria de Tesis</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalAsesoriaTesis}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Talleres</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalTalleres}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Publicaciones</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalPublicaciones}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Grupo de Estudio</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalGrupoEstudio}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Multidisciplinarios</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalMultidisciplinarios}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Proyectos Deudores</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalDeudores}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Eventos</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalEvento}
            </Link>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Equipamiento</Box>
          {loading ? (
            <Spinner size="large" />
          ) : (
            <Link variant="awsui-value-large" href="#">
              {data.totalEquipamiento}
            </Link>
          )}
        </div>
        
      </ColumnLayout>
    </Container>
  );
}
