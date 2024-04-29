import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Icon,
  SpaceBetween,
  StatusIndicator,
  Link,
} from "@cloudscape-design/components";

export default function () {
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
            <Box variant="awsui-key-label">Deudas</Box>
            <StatusIndicator type="success">Ninguna pendiente</StatusIndicator>
          </div>
          <div>
            <Box variant="awsui-key-label">Publicaciones</Box>
            <StatusIndicator type="pending">Por revisar (2)</StatusIndicator>
          </div>
        </ColumnLayout>
        <div>
          <Box variant="awsui-key-label">Orcid</Box>
          <Link href="#">
            <StatusIndicator type="warning">
              No vinculado <Icon variant="warning" name="external" />
            </StatusIndicator>
          </Link>
        </div>
      </SpaceBetween>
    </Container>
  );
}
