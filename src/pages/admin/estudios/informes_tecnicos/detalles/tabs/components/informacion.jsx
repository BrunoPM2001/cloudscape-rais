import { Container } from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <SpaceBetween size="s">
        <div>
          <Box variant="awsui-key-label">Título</Box>
          {loading ? <Spinner /> : <div>{data.titulo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Resolución rectoral</Box>
          {loading ? <Spinner /> : <div>{data.resolucion_rectoral}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Periodo</Box>
          {loading ? <Spinner /> : <div>{data.periodo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Facultad</Box>
          {loading ? <Spinner /> : <div>{data.facultad}</div>}
        </div>
      </SpaceBetween>
    </Container>
  );
};
