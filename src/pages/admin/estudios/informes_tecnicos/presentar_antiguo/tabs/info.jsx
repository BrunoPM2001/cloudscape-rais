import {
  Box,
  ColumnLayout,
  Container,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ proyecto }) => {
  return (
    <SpaceBetween size="l">
      <Container>
        <ColumnLayout columns={2}>
          <div>
            <div>
              <Box variant="awsui-key-label">Título</Box>
              <Box>{proyecto?.titulo}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Tipo</Box>
              <Box>{proyecto?.tipo}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Código</Box>
              <Box>{proyecto?.codigo}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Año</Box>
              <Box>{proyecto?.periodo}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Resolución</Box>
              <Box>{proyecto?.resolucion}</Box>
            </div>
          </div>
          <div>
            <div>
              <Box variant="awsui-key-label">Facultad</Box>
              <Box>{proyecto?.facultad}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Instituto</Box>
              <Box>{proyecto?.instituto}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Línea de investigación</Box>
              <Box>{proyecto?.linea}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Tipo de investigación</Box>
              <Box>{proyecto?.tipo_investigacion}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Responsable</Box>
              <Box>{proyecto?.responsable}</Box>
            </div>
          </div>
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  );
};
