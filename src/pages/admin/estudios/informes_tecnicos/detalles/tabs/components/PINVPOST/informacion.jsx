import { Container } from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container>
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          <div>{data.titulo}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Resolución rectoral</Box>
          <div>{data.resolucion_rectoral}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Periodo</Box>
          <div>{data.periodo}</div>
        </div>
        <div>
          <Box variant="awsui-key-label">Facultad</Box>
          <div>{data.facultad}</div>
        </div>
      </SpaceBetween>
    </Container>
  );
};
