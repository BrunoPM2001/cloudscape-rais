import {
  Table,
  Box,
  SpaceBetween,
  PropertyFilter,
  Header,
  Link,
  Pagination,
  Badge,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "titulo",
    header: "Título",
    cell: (item) => <Link href="#">{item.titulo}</Link>,
    sortingField: "titulo",
    isRowHeader: true,
  },
  {
    id: "fecha_publicacion",
    header: "Fecha de publicación",
    cell: (item) => item.fecha_publicacion,
    sortingField: "fecha_publicacion",
    width: 210,
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == "Eliminado"
            ? "red"
            : item.estado == "Registrado"
            ? "green"
            : item.estado == "Observado"
            ? "red"
            : item.estado == "Enviado"
            ? "blue"
            : item.estado == "En proceso"
            ? "severity-low"
            : item.estado == "Anulado"
            ? "red"
            : item.estado == "No registrado"
            ? "grey"
            : item.estado == "Duplicado"
            ? "red"
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
  { id: "titulo", visible: true },
  { id: "fecha_publicacion", visible: true },
  { id: "tipo", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  States
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
            <b>No hay registros</b>
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

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Data
  useEffect(() => {
    const getData = async () => {
      const res = await axiosBase.get("admin/estudios/grupos/publicaciones", {
        params: {
          grupo_id: id,
        },
      });
      const data = res.data;
      setDistribution(data);
      setLoading(false);
    };
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
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No hay registros...</b>
          </SpaceBetween>
        </Box>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar publicación"
          countText={`${filteredItemsCount} coincidencias`}
          expandToViewport
        />
      }
      header={<Header>Publicaciones</Header>}
      pagination={<Pagination {...paginationProps} />}
    />
  );
};
