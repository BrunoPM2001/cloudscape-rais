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
  const convocatorias = data?.convocatorias || [];
  const abiertas = convocatorias.filter(c => c.estado === "Abierta");
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

            {loading ? (
              <Spinner />
            ) : (
              <Popover
                header="Convocatoria en curso"
                position="bottom"
                content={
                  abiertas.length > 0 ? (
                    <>
                      {abiertas.map((c, i) => (
                        <div key={i}>{c.descripcion}</div>
                      ))}
                    </>
                  ) : (
                    <>No hay convocatorias vigentes para inscribirse</>
                  )
                }
              >
                <StatusIndicator type={abiertas.length > 0 ? "success" : "pending"}>
                  {abiertas.length > 0
                    ? `Abiertas (${abiertas.length})`
                    : "Cerradas"}
                </StatusIndicator>
              </Popover>
            )}
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
