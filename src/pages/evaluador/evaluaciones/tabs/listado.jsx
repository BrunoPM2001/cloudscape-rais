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
import axiosBase from "../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo de proyecto",
    key: "tipo_proyecto",
    groupValuesLabel: "Tipos de proyecto",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Linea",
    key: "linea",
    groupValuesLabel: "Lineas",
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
    id: "tipo_proyecto",
    header: "Tipo de proyecto",
    cell: (item) => item.tipo_proyecto,
    sortingField: "tipo_proyecto",
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "linea",
    header: "Linea",
    cell: (item) => item.linea,
    sortingField: "linea",
  },
  {
    id: "periodo",
    header: "Periodo",
    cell: (item) => item.periodo,
    sortingField: "periodo",
  },
  {
    id: "criterios",
    header: "Criterios",
    cell: (item) => item.criterios,
    sortingField: "criterios",
  },
  {
    id: "criterios_evaluados",
    header: "Criterios evaluados",
    cell: (item) => item.criterios_evaluados,
    sortingField: "criterios_evaluados",
  },
  {
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
    sortingField: "puntaje",
  },
  {
    id: "evaluado",
    header: "Evaluado",
    cell: (item) => (
      <Badge
        color={
          item.evaluado == "NO"
            ? "red"
            : item.evaluado == "SÍ"
            ? "green"
            : "red"
        }
      >
        {item.evaluado}
      </Badge>
    ),
    sortingField: "evaluado",
  },
  {
    id: "ficha",
    header: "Ficha",
    cell: (item) => (
      <Badge
        color={
          item.ficha == "NO" ? "red" : item.ficha == "SÍ" ? "green" : "red"
        }
      >
        {item.ficha}
      </Badge>
    ),
    sortingField: "ficha",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "tipo_proyecto", visible: true },
  { id: "titulo", visible: true },
  { id: "facultad", visible: true },
  { id: "linea", visible: true },
  { id: "periodo", visible: true },
  { id: "criterios", visible: true },
  { id: "criterios_evaluados", visible: true },
  { id: "puntaje", visible: true },
  { id: "evaluado", visible: true },
  { id: "ficha", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("evaluador/listarProyectos");
    const data = res.data;
    setDistribution(data.data);
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
      resizableColumns
      enableKeyboardNavigation
      selectionType="single"
      header={
        <Header
          actions={
            <Button
              disabled={collectionProps.selectedItems.length == 0}
              variant="primary"
              onClick={() => {
                const query = queryString.stringify({
                  proyecto_id: selectedItems[0]["id"],
                });
                window.location.href = "proyectoDetalle?" + query;
              }}
            >
              Evaluar
            </Button>
          }
        >
          Proyectos a evaluar ({distributions.length})
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar proyecto"
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
  );
};
