import {
  Box,
  ColumnLayout,
  Grid,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={4}>
        <div>
          <Box variant="awsui-key-label">Código de alumno</Box>
          {loading ? <Spinner /> : <div>{data.codigo}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Facultad</Box>
          {loading ? <Spinner /> : <div>{data.facultad}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Permanencia</Box>
          {loading ? <Spinner /> : <div>{data.tipo_investigador_estado}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Tipo de alumno</Box>
          {loading ? <Spinner /> : <div>{data.tipo}</div>}
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
