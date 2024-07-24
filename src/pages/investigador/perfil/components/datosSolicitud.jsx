import {
  Box,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default ({ data }) => {
  return (
    <Container header={<Header variant="h3">Datos del investigador</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Apellidos y nombres</Box>
            <div>{data.nombres}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">N° documento</Box>
            <div>{data.doc_numero}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">CTI Vitae</Box>
            <div>{data.cti_vitae}</div>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Renacyt</Box>
            <div>{data.renacyt}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Renacyt nivel</Box>
            <div>{data.renacyt_nivel}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Google scholar</Box>
            <div>{data.google_scholar}</div>
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">Código orcid</Box>
            <div>{data.codigo_orcid}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Categoría de docente</Box>
            <div>{data.docente_categoria}</div>
          </div>
          <div>
            <Box variant="awsui-key-label">Clase</Box>
            <div>{data.clase}</div>
          </div>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
