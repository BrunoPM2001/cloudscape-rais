import {
  Badge,
  Box,
  Button,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useState } from "react";
import ModalDetalleHistorial from "../components/modalDetalleHistorial";

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
  },
  {
    id: "created_at",
    header: "Fecha de solicitud",
    cell: (item) => item.created_at,
    sortingField: "created_at",
  },
  {
    id: "observacion",
    header: "Observación",
    cell: (item) => item.observacion,
    sortingField: "observacion",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == 3
            ? "blue"
            : item.estado == 2
            ? "red"
            : item.estado == 1
            ? "green"
            : "grey"
        }
      >
        {item.estado == 3
          ? "Nueva transferencia"
          : item.estado == 2
          ? "Rechazado"
          : item.estado == 1
          ? "Completado"
          : "Temporal"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "created_at", visible: true },
  { id: "observacion", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading }) => {
  //  States
  const [visible, setVisible] = useState(false);

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  return (
    <>
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        resizableColumns
        selectionType="single"
        header={
          <Header
            counter={"(" + items.length + ")"}
            actions={
              <Button
                variant="primary"
                disabled={
                  collectionProps.selectedItems.length > 0 ? false : true
                }
                onClick={() => setVisible(true)}
              >
                Ver detalle
              </Button>
            }
          >
            Historial de transferencias
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
      {visible && (
        <ModalDetalleHistorial
          id={collectionProps.selectedItems[0].id}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </>
  );
};
