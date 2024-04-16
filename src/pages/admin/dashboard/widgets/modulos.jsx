import {
  Box,
  ColumnLayout,
  Container,
  Header,
  StatusIndicator,
} from "@cloudscape-design/components";

export default function () {
  return (
    <Container
      header={
        <Header variant="h2" description="Estado de los módulos del RAIS">
          Módulos
        </Header>
      }
      fitHeight={true}
    >
      <ColumnLayout columns={2} minColumnWidth={140}>
        <div>
          <Box variant="awsui-key-label">Administrador</Box>
          <StatusIndicator type="success">Ok</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">Investigador</Box>
          <StatusIndicator type="pending">En mantenimiento</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">Evaluador</Box>
          <StatusIndicator type="stopped">Deshabilitado</StatusIndicator>
        </div>
        <div>
          <Box variant="awsui-key-label">Facultad</Box>
          <StatusIndicator type="warning">En desarrollo</StatusIndicator>
        </div>
      </ColumnLayout>
    </Container>
  );
}
