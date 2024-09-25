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
          id: "tipo_integrante",
          header: "Tipo de integrante",
          cell: (item) => item.tipo_integrante,
        },
        {
          id: "nombre",
          header: "Nombre",
          cell: (item) => item.nombre,
        },
        {
          id: "tipo",
          header: "Tipo",
          cell: (item) => item.tipo,
        },
        {
          id: "tipo_tesis",
          header: "Tipo de tesis",
          cell: (item) => item.tipo_tesis,
        },
        {
          id: "titulo_tesis",
          header: "Título de tesis",
          cell: (item) => item.titulo_tesis,
        },
      ]}
      columnDisplay={[
        { id: "tipo_integrante", visible: true },
        { id: "nombre", visible: true },
        { id: "tipo", visible: true },
        { id: "tipo_tesis", visible: true },
        { id: "titulo_tesis", visible: true },
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