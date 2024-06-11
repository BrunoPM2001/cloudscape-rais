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
import queryString from "query-string";
import axiosBase from "../../../../../../api/axios";
import ModalComprobante from "../components/modalComprobante";

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
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distributions, setDistribution] = useState([]);
  const {
    items,
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
  const [enableBtn, setEnableBtn] = useState(false);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/economia/listadoComprobantes", {
      params: {
        geco_id: id,
      },
    });
    const data = res.data;
    setDistribution(data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

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
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        header={
          <Header
            counter={"(" + distributions.length + ")"}
            actions={
              <Button
                disabled={!enableBtn}
                variant="primary"
                onClick={() => setVisible(true)}
              >
                Ver detalle
              </Button>
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
      {visible && (
        <ModalComprobante
          visible={visible}
          setVisible={setVisible}
          item={selectedItems[0]}
          reload={getData}
        />
      )}
    </>
  );
};
