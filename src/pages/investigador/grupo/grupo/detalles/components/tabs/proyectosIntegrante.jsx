import { Badge, Box, SpaceBetween, Table } from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "codigo_proyecto",
    header: "Código de proyecto",
    cell: (item) => item.codigo_proyecto,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "No aprobado"
            ? "grey"
            : item.estado == "Aprobado"
            ? "green"
            : item.estado == "Observado"
            ? "red"
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "severity-low"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "Sustentado"
            ? "blue"
            : item.estado == "En ejecución"
            ? "blue"
            : item.estado == "Ejecutado"
            ? "green"
            : item.estado == "Concluido"
            ? "green"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
  },
];

const columnDisplay = [
  { id: "codigo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "periodo", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading }) => {
  return (
    <Table
      trackBy="codigo_proyecto"
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      items={data}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
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
