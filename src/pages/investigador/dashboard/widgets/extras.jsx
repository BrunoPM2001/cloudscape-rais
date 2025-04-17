import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
  Link,
  Popover,
  Spinner,
} from "@cloudscape-design/components";

export default function ({ data, loading }) {
  return (
    <Container
      header={
        <Header variant="h2" description="Notificaciones pendientes">
          Detalles
        </Header>
      }
      fitHeight={true}
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={2} minColumnWidth={140}>
          <div>
            <Box variant="awsui-key-label">Convocatorias</Box>
            <Popover
              header="Convocatoria en curso"
              content={<>No hay convocatorias vigentes para inscribirse</>}
              position="bottom"
            >
              <StatusIndicator type="pending">Cerradas</StatusIndicator>
            </Popover>
          </div>
          <div>
            <Box variant="awsui-key-label">Publicaciones pendientes</Box>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {data.publicacionesProceso == 0 ? (
                  <StatusIndicator type="success">Ninguna</StatusIndicator>
                ) : (
                  <StatusIndicator type="pending">
                    En proceso ({data.publicacionesProceso})
                  </StatusIndicator>
                )}
              </>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Orcid</Box>
            {loading ? (
              <Spinner />
            ) : (
              <Popover
                position="bottom"
                content={
                  data.orcid.message == "warning" ? (
                    <>
                      <Link external href={data.orcid.link} target="_blank">
                        {data.orcid.detail}
                      </Link>
                    </>
                  ) : (
                    <>{data.orcid.detail}</>
                  )
                }
              >
                <StatusIndicator type={data.orcid.message}>
                  {data.orcid.text}
                </StatusIndicator>
              </Popover>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Constancia CDI</Box>
            <Link external href="/investigador/perfil">
              Ir a mi perfil
            </Link>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
