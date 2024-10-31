import {
  Box,
  ColumnLayout,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={4}>
        <div>
          <Box variant="awsui-key-label">Código de docente</Box>
          {loading ? <Spinner /> : <div>{data.codigo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">N° de documento</Box>
          {loading ? <Spinner /> : <div>{data.doc_numero}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Categoría / Clase</Box>
          {loading ? <Spinner /> : <div>{data.docente_categoria}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Dependencia</Box>
          {loading ? <Spinner /> : <div>{data.dependencia}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Facultad</Box>
          {loading ? <Spinner /> : <div>{data.facultad}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Orcid ID</Box>
          {loading ? <Spinner /> : <div>{data.codigo_orcid}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Research ID</Box>
          {loading ? <Spinner /> : <div>{data.researcher_id}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Scopus ID</Box>
          {loading ? <Spinner /> : <div>{data.scopus_id}</div>}
        </div>
      </ColumnLayout>
      <div>
        <Box variant="awsui-key-label">Biografía</Box>
        {loading ? <Spinner /> : <div>{data.biografia}</div>}
      </div>
    </SpaceBetween>
  );
};
