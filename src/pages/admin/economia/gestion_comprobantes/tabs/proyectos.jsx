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
  {
    propertyLabel: "Código de proyecto",
    key: "codigo_proyecto",
    groupValuesLabel: "Códigos",
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
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    sortingField: "responsable",
    minWidth: 300,
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    minWidth: 200,
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
    id: "pendientes",
    header: "Pendientes",
    cell: (item) => (
      <StatusIndicator type={item.pendientes > 0 ? "warning" : "success"}>
        {item.pendientes > 0 ? item.pendientes : "Ninguno"}
      </StatusIndicator>
    ),
    sortingField: "pendientes",
  },
  {
    id: "revisados",
    header: "Revisados",
    cell: (item) => (
      <StatusIndicator type="info">{item.revisados}</StatusIndicator>
    ),
    sortingField: "revisados",
  },
  {
    id: "total",
    header: "Total",
    cell: (item) => item.total,
    sortingField: "total",
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
  { id: "pendientes", visible: true },
  { id: "revisados", visible: true },
  { id: "total", visible: true },
];

export default () => {
  //  Data states
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
    sorting: {},
    selection: {},
  });

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

  return (
    <Table
      {...collectionProps}
      trackBy="id"
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={columnDisplay}
      loading={loading}
      loadingText="Cargando datos"
      wrapLines
      enableKeyboardNavigation
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
      selectionType="single"
      header={
        <Header
          counter={"(" + distributions.length + ")"}
          actions={
            <Button
              disabled={collectionProps.selectedItems.length == 0}
              variant="primary"
              onClick={() => {
                const query = queryString.stringify({
                  id: collectionProps.selectedItems[0]["id"],
                });
                window.location.href = "gestion_comprobantes/detalle?" + query;
              }}
            >
              Ver detalles
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
