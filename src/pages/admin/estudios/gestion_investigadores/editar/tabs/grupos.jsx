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
    id: "nombre",
    header: "Nombre",
    cell: (item) => (
      <Link
        href={`/admin/estudios/grupos/detalle?id=${item.id}`}
        target="_blank"
      >
        {item.nombre}
      </Link>
    ),
  },
  {
    id: "categoria",
    header: "Categoría",
    cell: (item) => item.categoria,
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
            : item.estado == "Observado"
            ? "red"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "grey"
            : item.estado == "Disuelto"
            ? "red"
            : item.estado == "Registrado"
            ? "green"
            : item.estado == "Reg. observado"
            ? "grey"
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
  { id: "nombre", visible: true },
  { id: "categoria", visible: true },
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
      wrapLines
      header={
        <Header
          variant="h3"
          counter={"(" + items.length + ")"}
          info={
            <Popover
              triggerType="custom"
              content="Grupos en los que está incluído (si es que estuviera en uno)"
            >
              <Link>Info</Link>
            </Popover>
          }
        >
          Grupos de investigación
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
