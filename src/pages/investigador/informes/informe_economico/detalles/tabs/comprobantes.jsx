import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState } from "react";
import ModalBoleta from "../components/modalBoleta";

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "numero",
    header: "N°",
    cell: (item) => item.numero,
    sortingField: "numero",
  },
  {
    id: "fecha",
    header: "Fecha",
    cell: (item) => item.fecha,
    sortingField: "fecha",
  },
  {
    id: "total_declarado",
    header: "Monto (S/)",
    cell: (item) => parseFloat(item.total_declarado).toFixed(3),
    sortingField: "total_declarado",
  },
  {
    id: "url",
    header: "Archivo",
    cell: (item) => (
      <Button
        variant="inline-icon"
        href={item.url}
        target="_blank"
        iconName="file-open"
      />
    ),
  },
  {
    id: "estado",
    header: "Excedido (S/)",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Aprobado"
            ? "green"
            : item.estado == "Rechazado"
            ? "red"
            : item.estado == "Observado"
            ? "grey"
            : item.estado == "Enviado"
            ? "blue"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo", visible: true },
  { id: "numero", visible: true },
  { id: "fecha", visible: true },
  { id: "total_declarado", visible: true },
  { id: "url", visible: true },
  { id: "estado", visible: true },
];

export default ({ data, loading }) => {
  //  States
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");

  //  Hooks
  const { items, collectionProps } = useCollection(data, {
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
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
        enableKeyboardNavigation
        selectionType="single"
        header={
          <Header
            counter={"(" + data.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  disabled={
                    collectionProps.selectedItems.length == 0 ? true : false
                  }
                  iconName="edit"
                >
                  Ver detalle
                </Button>
                <ButtonDropdown
                  variant="primary"
                  items={[
                    {
                      id: "action_1",
                      text: "Boleta de venta",
                    },
                    {
                      id: "action_2",
                      text: "Factura",
                    },
                    {
                      id: "action_3",
                      text: "Recibo de movilidad",
                    },
                    {
                      id: "action_4",
                      text: "Recibo por honorarios",
                    },
                    {
                      id: "action_5",
                      text: "Boleto de viaje",
                    },
                    {
                      id: "action_6",
                      text: "Declaración jurada",
                    },
                    {
                      id: "action_7",
                      text: "Liquidación de compra",
                    },
                    {
                      id: "action_8",
                      text: "Otros",
                    },
                    {
                      id: "action_9",
                      text: "Recibo de ingreso - UNMSM",
                    },
                    {
                      id: "action_10",
                      text: "Ticket",
                    },
                    {
                      id: "action_11",
                      text: "Recibo de banco",
                    },
                  ]}
                  onItemClick={({ detail }) => {
                    setVisible(true);
                    setType(detail.id);
                  }}
                >
                  Agregar comprobante
                </ButtonDropdown>
              </SpaceBetween>
            }
          >
            Listado de partidas
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
      {visible &&
        (type == "action_1" ? (
          <ModalBoleta visible={visible} setVisible={setVisible} />
        ) : (
          <></>
        ))}
    </>
  );
};
