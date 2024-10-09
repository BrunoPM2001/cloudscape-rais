import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

const columnDefinitions = [
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
  },
  {
    id: "justificacion",
    header: "Justificación",
    cell: (item) => item.justificacion,
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
];

const columnDisplay = [
  { id: "actividad", visible: true },
  { id: "justificacion", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
];

export default ({ data }) => {
  const { items, actions, collectionProps, paginationProps } = useCollection(
    data,
    {
      sorting: {},
      selection: {},
    }
  );

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      enableKeyboardNavigation
      wrapLines
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      header={
        <Header
          counter={"(" + data.length + ")"}
          actions={
            <ButtonDropdown
              disabled={collectionProps.selectedItems.length > 0 ? false : true}
              variant="normal"
              onItemClick={({ detail }) => {
                if (detail.id == "action_1_1") {
                  setType("delete");
                } else if (detail.id == "action_1_2") {
                  setType("edit");
                }
              }}
              items={[
                {
                  text: "Cargar archivo",
                  id: "action_1_1",
                },
                {
                  text: "Ver archivo cargado",
                  id: "action_1_2",
                },
              ]}
            >
              Acciones
            </ButtonDropdown>
          }
        >
          Actividades
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
