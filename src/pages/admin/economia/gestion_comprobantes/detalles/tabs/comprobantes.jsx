import {
  Badge,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../../api/axios";
import ModalComprobante from "../components/modalComprobante";
import ModalAudit from "../components/modalAudit";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Número",
    key: "numero",
    groupValuesLabel: "Números",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha",
    key: "fecha",
    groupValuesLabel: "Fechas",
    operators: stringOperators,
  },
  {
    propertyLabel: "Monto declarado",
    key: "total_declarado",
    groupValuesLabel: "Montos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de carga",
    key: "created_at",
    groupValuesLabel: "Fechas de carga",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de actualización",
    key: "updated_at",
    groupValuesLabel: "Fechas de actualización",
    operators: stringOperators,
  },
  {
    propertyLabel: "Estado",
    key: "estado",
    groupValuesLabel: "Estados",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
    isRowHeader: true,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "numero",
    header: "Número",
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
    header: "Monto declarado",
    cell: (item) => parseFloat(item.total_declarado).toFixed(2),
    sortingField: "total_declarado",
  },
  {
    id: "created_at",
    header: "Fecha de carga",
    cell: (item) => item.created_at,
    sortingField: "created_at",
  },
  {
    id: "updated_at",
    header: "Fecha de actualización",
    cell: (item) => item.updated_at,
    sortingField: "updated_at",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == 1
            ? "green"
            : item.estado == 2
            ? "red"
            : item.estado == 3
            ? "grey"
            : item.estado == 4
            ? "blue"
            : item.estado == 5
            ? "red"
            : item.estado == 6
            ? "severity-low"
            : "red"
        }
      >
        {item.estado == 1
          ? "Aprobado"
          : item.estado == 2
          ? "Rechazado"
          : item.estado == 3
          ? "Observado"
          : item.estado == 4
          ? "Enviado"
          : item.estado == 5
          ? "Anulado"
          : item.estado == 6
          ? "Aprobado V.B"
          : "Error"}
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
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
  { id: "estado", visible: true },
];

export default ({ id }) => {
  //  Data states
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(distributions, {
    propertyFiltering: {
      filteringProperties: FILTER_PROPS,
      empty: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      ),
      noMatch: (
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay coincidencias</b>
          </SpaceBetween>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setDistribution([]);
    setLoading(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/listadoComprobantes",
      {
        params: {
          geco_id: id,
        },
      }
    );
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

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
        wrapLines
        onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
        enableKeyboardNavigation
        selectionType="single"
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  disabled={collectionProps.selectedItems.length == 0}
                  onClick={() => setType("audit")}
                >
                  Ver historial
                </Button>
                <Button
                  variant="primary"
                  disabled={collectionProps.selectedItems.length == 0}
                  onClick={() => setType("detalle")}
                >
                  Ver detalle
                </Button>
              </SpaceBetween>
            }
          >
            Listado de comprobantes
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar comprobante"
            countText={`${filteredItemsCount} coincidencias`}
            expandToViewport
            virtualScroll
          />
        }
        pagination={<Pagination {...paginationProps} />}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
      {type == "detalle" ? (
        <ModalComprobante
          close={() => setType("")}
          item={collectionProps.selectedItems[0]}
          reload={getData}
        />
      ) : type == "audit" ? (
        <ModalAudit
          close={() => setType("")}
          item={collectionProps.selectedItems[0]}
        />
      ) : (
        <></>
      )}
    </>
  );
};
