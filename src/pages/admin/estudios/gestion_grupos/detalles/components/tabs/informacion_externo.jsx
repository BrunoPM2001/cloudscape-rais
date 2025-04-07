import {
  Box,
  ColumnLayout,
  Grid,
  Link,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={4}>
        <div>
          <Box variant="awsui-key-label">Código orcid</Box>
          {loading ? <Spinner /> : <div>{data.codigo_orcid}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Institución</Box>
          {loading ? <Spinner /> : <div>{data.institucion}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Tipo de documento</Box>
          {loading ? <Spinner /> : <div>{data.doc_tipo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Número de documento</Box>
          {loading ? <Spinner /> : <div>{data.doc_numero}</div>}
        </div>
      </ColumnLayout>
      <ColumnLayout columns={2}>
        <div>
          <Box variant="awsui-key-label">Documento cargado</Box>
          {loading ? (
            <Spinner />
          ) : data.nombre_documento ? (
            <Link href={data.url} external target="_blank">
              {data.nombre_documento}
            </Link>
          ) : (
            <div>No hay información</div>
          )}
        </div>
        <div>
          <Box variant="awsui-key-label">Fecha de carga del documento</Box>
          {loading ? <Spinner /> : <div>{data.fecha_documento}</div>}
        </div>
      </ColumnLayout>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xxs: 4 } },
          { colspan: { default: 12, xxs: 4 } },
          { colspan: { default: 12, xxs: 4 } },
        ]}
      >
        <div>
          <Box variant="awsui-key-label">Teléfono celular</Box>
          {loading ? <Spinner /> : <div>{data.telefono_movil}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Teléfono de casa</Box>
          {loading ? <Spinner /> : <div>{data.telefono_casa}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Teléfono de trabajo</Box>
          {loading ? <Spinner /> : <div>{data.telefono_trabajo}</div>}
        </div>
      </Grid>
    </SpaceBetween>
  );
};
