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
          <Box variant="awsui-key-label">Of. para R.R</Box>
          {loading ? <Spinner /> : <div>{data.resolucion_oficina}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Fecha inclusión</Box>
          {loading ? <Spinner /> : <div>{data.fecha_inclusion}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Resolución</Box>
          {loading ? <Spinner /> : <div>{data.resolucion}</div>}
        </div>
        <div>
          <Box variant="awsui-key-label">Fecha de R.R.</Box>
          {loading ? <Spinner /> : <div>{data.resolucion_fecha}</div>}
        </div>
      </ColumnLayout>
      <div>
        <Box variant="awsui-key-label">Observación</Box>
        {loading ? <Spinner /> : <div>{data.observacion}</div>}
      </div>
    </SpaceBetween>
  );
};
