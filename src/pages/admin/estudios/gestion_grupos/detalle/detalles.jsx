import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";

export default () => {
  return (
    <Container header={<Header variant="h2">Detalles del grupo</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombre</Box>
            <div>Investigando para Educar</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            <div>Educación</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Responsable</Box>
            <div>Dante Manuel Macazana Fernandez</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Estado</Box>
            <StatusIndicator type="success">Registrado</StatusIndicator>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Resolución de creación</Box>
            <div>013569-2023-R</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución de creación</Box>
            <div>2023-12-20</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Resolución actual</Box>
            <div>013569-2023-R</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Fecha de resolución actual</Box>
            <div>2023-12-20</div>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Observaciones</Box>
            <StatusIndicator type="info">
              Por indicación de la directora de DP, la profesora Jovita Silva,
              se cambia el estado a Registrado, para ser regularizado
              posteriormente (RVO) 05-12-2023
            </StatusIndicator>
          </div>
          <div>
            <Box variant="awsui-key-label">Observaciones al investigador</Box>
            <StatusIndicator type="success">Ninguna</StatusIndicator>
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
