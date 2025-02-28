import {
  Table,
  Box,
  SpaceBetween,
  Header,
  ColumnLayout,
  Spinner,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Table
      columnDefinitions={[
        {
          id: "codigo",
          header: "Código",
          cell: (item) => item.codigo,
        },
        {
          id: "partida",
          header: "Partida",
          cell: (item) => item.partida,
        },
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
        },
        {
          id: "monto",
          header: "Monto",
          cell: (item) => item.monto,
        },
      ]}
      columnDisplay={[
        { id: "codigo", visible: true },
        { id: "partida", visible: true },
        { id: "tipo", visible: true },
        { id: "monto", visible: true },
      ]}
      enableKeyboardNavigation
      items={data.data}
      loadingText="Cargando datos"
      loading={loading}
      wrapLines
      trackBy="tipo"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      footer={
        <ColumnLayout columns={3} variant="text-grid">
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Box variant="awsui-key-label">Bienes</Box>
              <SpaceBetween direction="horizontal" size="m">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Cantidad:</Box>
                  {loading ? <Spinner /> : data.info.bienes_cantidad}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Monto:</Box>
                  {loading ? <Spinner /> : data.info.bienes_monto}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Porcentaje:</Box>
                  {loading ? <Spinner /> : data.info.bienes_porcentaje + "%"}
                </SpaceBetween>
              </SpaceBetween>
            </div>
          </SpaceBetween>
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Box variant="awsui-key-label">Servicios</Box>
              <SpaceBetween direction="horizontal" size="m">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Cantidad:</Box>
                  {loading ? <Spinner /> : data.info.servicios_cantidad}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Monto:</Box>
                  {loading ? <Spinner /> : data.info.servicios_monto}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Porcentaje:</Box>
                  {loading ? <Spinner /> : data.info.servicios_porcentaje + "%"}
                </SpaceBetween>
              </SpaceBetween>
            </div>
          </SpaceBetween>
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Box variant="awsui-key-label">Otros</Box>
              <SpaceBetween direction="horizontal" size="m">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Cantidad:</Box>
                  {loading ? <Spinner /> : data.info.otros_cantidad}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Monto:</Box>
                  {loading ? <Spinner /> : data.info.otros_monto}
                </SpaceBetween>
                <SpaceBetween direction="horizontal" size="xxs">
                  <Box variant="div">Porcentaje:</Box>
                  {loading ? <Spinner /> : data.info.otros_porcentaje + "%"}
                </SpaceBetween>
              </SpaceBetween>
            </div>
          </SpaceBetween>
        </ColumnLayout>
      }
      header={<Header>Presupuesto del proyecto</Header>}
    />
  );
};
