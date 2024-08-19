import {
  Table,
  Box,
  SpaceBetween,
  Header,
  Pagination,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
const columnDefinitions = [
  {
    id: "condicion",
    header: "Condicion",
    cell: (item) => item.condicion,
    sortingField: "condicion",
    isRowHeader: true,
  },
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
];

const columnDisplay = [
  { id: "condicion", visible: true },
  { id: "codigo", visible: true },
  { id: "nombres", visible: true },
];

export default ({ data, loading }) => {
  const { items, collectionProps, paginationProps } = useCollection(data, {
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  return (
    <Table
      {...collectionProps}
      trackBy="nombres"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      resizableColumns
      enableKeyboardNavigation
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      header={<Header counter={"(" + data.length + ")"}>Participantes</Header>}
      pagination={<Pagination {...paginationProps} />}
    />
  );
};
