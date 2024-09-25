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
          id: "actividad",
          header: "Actividad",
          cell: (item) => item.actividad,
        },
        {
          id: "responsable",
          header: "Responsable",
          cell: (item) => item.responsable,
        },
        {
          id: "fecha_inicio",
          header: "Fecha de inicio",
          cell: (item) => item.fecha_inicio,
        },
        {
          id: "fecha_fin",
          header: "Fecha de fin",
          cell: (item) => item.fecha_fin,
        },
      ]}
      columnDisplay={[
        { id: "actividad", visible: true },
        { id: "responsable", visible: true },
        { id: "fecha_inicio", visible: true },
        { id: "fecha_fin", visible: true },
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
      header={<Header>Calendario del proyecto</Header>}
    />
  );
};
