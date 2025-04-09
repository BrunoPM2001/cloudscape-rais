import {
  Table,
  Box,
  SpaceBetween,
  Header,
} from "@cloudscape-design/components";

export default ({ data, loading }) => {
  return (
    <Table
      columnDefinitions={[
        {
          id: "id",
          header: "Id",
          cell: (item) => item.id,
          minWidth: 100,
        },
        {
          id: "codigo",
          header: "Código",
          cell: (item) => item.codigo,
          minWidth: 100,
        },
        {
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
          minWidth: 150,
        },
        {
          id: "nombre",
          header: "Nombre",
          cell: (item) => item.nombre,
          minWidth: 200,
        },
        {
          id: "tipo_investigador",
          header: "Tipo de investigador",
          cell: (item) => item.tipo_investigador,
          minWidth: 150,
        },
      ]}
      columnDisplay={[
        { id: "id", visible: true },
        { id: "codigo", visible: true },
        { id: "tipo_integrante", visible: true },
        { id: "nombre", visible: true },
        { id: "tipo_investigador", visible: true },
      ]}
      enableKeyboardNavigation
      items={data}
      loadingText="Cargando datos"
      loading={loading}
      wrapLines
      trackBy="id"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      header={<Header>Integrantes del proyecto</Header>}
    />
  );
};
