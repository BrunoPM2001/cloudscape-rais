import {
  Badge,
  Box,
  Button,
  Header,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  StatusIndicator,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import queryString from "query-string";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  // {
  //   propertyLabel: "ID",
  //   key: "id",
  //   groupValuesLabel: "IDS",
  //   operators: stringOperators,
  // },
  {
    propertyLabel: "Código de proyecto",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de comprobante",
    key: "fecha_ultimo_comprobante",
    groupValuesLabel: "Fechas de comprobante",
    operators: stringOperators,
  },
  {
    propertyLabel: "Responsable",
    key: "responsable",
    groupValuesLabel: "Responsables",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Periodo",
    key: "periodo",
    groupValuesLabel: "Periodos",
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
    id: "codigo_proyecto",
    header: "Código de proyecto",
    cell: (item) => item.codigo_proyecto,
    sortingField: "codigo_proyecto",
  },
  {
    id: "fecha_ultimo_comprobante",
    header: "Fecha de último comprobante",
    cell: (item) => item.fecha_ultimo_comprobante,
    sortingField: "fecha_ultimo_comprobante",
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "cuenta",
    header: "Pendientes",
    cell: (item) => (
      <StatusIndicator type={item.cuenta > 0 ? "warning" : "success"}>
        {item.cuenta > 0 ? item.cuenta : "Ok"}
      </StatusIndicator>
    ),
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == 5
            ? "grey"
            : item.estado == 4
            ? "blue"
            : item.estado == 3
            ? "grey"
            : item.estado == 2
            ? "red"
            : item.estado == 1
            ? "green"
            : "red"
        }
      >
        {item.estado == 5
          ? "Anulado"
          : item.estado == 4
          ? "Pendiente"
          : item.estado == 3
          ? "Observado"
          : item.estado == 2
          ? "Rechazado"
          : item.estado == 1
          ? "Aprobado"
          : "Error"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: false },
  { id: "codigo_proyecto", visible: true },
  { id: "fecha_ultimo_comprobante", visible: true },
  { id: "responsable", visible: true },
  { id: "facultad", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "periodo", visible: true },
  { id: "cuenta", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
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
    sorting: {},
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(false);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/economia/comprobantes/listadoProyectos"
    );
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
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <Button
              disabled={!enableBtn}
              variant="primary"
              onClick={() => {
                const query = queryString.stringify({
                  id: selectedItems[0]["id"],
                });
                window.location.href = "gestion_comprobantes/detalle?" + query;
              }}
            >
              Ver detalle
            </Button>
          }
        >
          Listado de proyectos
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto"
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
  );
};
