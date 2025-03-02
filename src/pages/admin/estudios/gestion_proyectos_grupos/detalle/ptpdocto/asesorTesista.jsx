import {
  Container,
  ColumnLayout,
  SpaceBetween,
  Box,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Container>
      <ColumnLayout columns={2}>
        <Box variant="h4">Asesor</Box>
        <Box variant="h4">Tesista</Box>
      </ColumnLayout>
      <ColumnLayout columns={4}>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombres</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.nombres}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">DNI</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.doc_numero}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Condición</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.tipo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Código de investigador</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.codigo}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Código ORCID</Box>
            {loading ? (
              <Spinner />
            ) : (
              <div>{data?.responsable?.codigo_orcid}</div>
            )}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.facultad}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Regina</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.regina}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Dina</Box>
            {loading ? <Spinner /> : <div>{data?.responsable?.dina}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Nombres</Box>
            {loading ? <Spinner /> : <div>{data?.tesista?.nombres}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">DNI</Box>
            {loading ? <Spinner /> : <div>{data?.tesista?.doc_numero}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Condición</Box>
            {loading ? <Spinner /> : <div>{data?.tesista?.tipo}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Código de alumno</Box>
            {loading ? <Spinner /> : <div>{data?.tesista?.codigo}</div>}
          </div>
          <div>
            <Box variant="awsui-key-label">Facultad</Box>
            {loading ? <Spinner /> : <div>{data?.tesista?.facultad}</div>}
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
