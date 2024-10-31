import { Box, SpaceBetween, Table } from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "codigo_proyecto",
    header: "Código de proyecto",
    cell: (item) => item.codigo_proyecto,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => item.estado,
  },
];

const columnDisplay = [
  { id: "codigo_proyecto", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "condicion", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading }) => {
  return (
    <Table
      trackBy="codigo_proyecto"
      variant="embedded"
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      items={data}
      loading={loading}
      loadingText="Cargando datos"
      wrapLines
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
    />
  );
};
