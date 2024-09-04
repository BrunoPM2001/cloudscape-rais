import {
  Badge,
  Box,
  Header,
  Link,
  Popover,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
  },
  {
    id: "tipo_proyecto",
    header: "Tipo",
    cell: (item) => item.tipo_proyecto,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "codigo_proyecto",
    header: "Código",
    cell: (item) => item.codigo_proyecto,
  },
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
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
            : item.estado == "En evaluación"
            ? "blue"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
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
  {
    id: "created_at",
    header: "Fecha de registro",
    cell: (item) => item.created_at,
    minWidth: 120,
  },
];

const columnDisplay = [
  { id: "periodo", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "codigo_proyecto", visible: true },
  { id: "condicion", visible: true },
  { id: "estado", visible: true },
  { id: "created_at", visible: true },
];

export default ({ loading, items }) => {
  return (
    <Table
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      // resizableColumns
      wrapLines
      header={
        <Header
          variant="h3"
          counter={"(" + items.length + ")"}
          info={
            <Popover
              triggerType="custom"
              content="Proyectos en los que ha participado"
            >
              <Link>Info</Link>
            </Popover>
          }
        >
          Proyectos de investigación
        </Header>
      }
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
