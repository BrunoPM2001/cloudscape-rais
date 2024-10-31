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
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDS",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre de grupo",
    key: "grupo_nombre",
    groupValuesLabel: "Nombres de grupo",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre corto",
    key: "grupo_nombre_corto",
    groupValuesLabel: "Nombres cortos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "grupo_categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Coordinador",
    key: "coordinador",
    groupValuesLabel: "Coordinadores",
    operators: stringOperators,
  },
  {
    propertyLabel: "Integrantes",
    key: "cantidad_integrantes",
    groupValuesLabel: "Cantidades",
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
    id: "grupo_nombre",
    header: "Nombre de grupo",
    cell: (item) => item.grupo_nombre,
    sortingField: "grupo_nombre",
  },
  {
    id: "grupo_nombre_corto",
    header: "Nombre corto",
    cell: (item) => item.grupo_nombre_corto,
    sortingField: "grupo_nombre_corto",
  },
  {
    id: "grupo_categoria",
    header: "Categoría",
    cell: (item) => item.grupo_categoria,
    sortingField: "grupo_categoria",
  },
  {
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
  },
  {
    id: "coordinador",
    header: "Coordinador",
    cell: (item) => item.coordinador,
    sortingField: "coordinador",
  },
  {
    id: "cantidad_integrantes",
    header: "Integrantes",
    cell: (item) => item.cantidad_integrantes,
    sortingField: "coordinador",
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
            ? "green"
            : item.estado == "En proceso"
            ? "blue"
            : "red"
        }
      >
        {item.estado}
      </Badge>
    ),
    sortingField: "estado",
  },
  {
    id: "created_at",
    header: "Fecha de creación",
    cell: (item) => item.created_at,
  },
  {
    id: "updated_at",
    header: "Fecha de actualización",
    cell: (item) => item.updated_at,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "grupo_nombre", visible: true },
  { id: "grupo_nombre_corto", visible: true },
  { id: "grupo_categoria", visible: true },
  { id: "facultad", visible: true },
  { id: "coordinador", visible: true },
  { id: "cantidad_integrantes", visible: true },
  { id: "estado", visible: true },
  { id: "created_at", visible: true },
  { id: "updated_at", visible: true },
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
    sorting: {
      defaultState: {
        sortingColumn: columnDefinitions[0],
        isDescending: true,
      },
    },
    selection: {},
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/estudios/grupos/listadoSolicitudes");
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
      resizableColumns
      enableKeyboardNavigation
      selectionType="single"
      onRowClick={({ detail }) => actions.setSelectedItems([detail.item])}
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
                window.location.href = "grupos/detalle?" + query;
              }}
            >
              Visualizar
            </Button>
          }
        >
          Solicitudes de grupos de investigación
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar solicitud"
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
