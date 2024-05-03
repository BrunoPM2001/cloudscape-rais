import {
  Table,
  Box,
  SpaceBetween,
  PropertyFilter,
  Header,
  Link,
  Pagination,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

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
];

const columnDisplay = [
  { id: "titulo", visible: true },
  { id: "fecha_publicacion", visible: true },
  { id: "tipo", visible: true },
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
      try {
        const res = await fetch(
          "http://localhost:8000/api/admin/estudios/grupos/publicaciones/" + id
        );
        if (!res.ok) {
          localStorage.clear();
          setDistribution([]);
          setLoading(!loading);
          throw new Error("Error in fetch");
        } else {
          const data = await res.json();
          setDistribution(data.data);
          setLoading(!loading);
        }
      } catch (error) {
        setDistribution([]);
        setLoading(!loading);
        console.log(error);
      }
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
