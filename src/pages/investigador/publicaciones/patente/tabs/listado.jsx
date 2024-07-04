import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
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
    groupValuesLabel: "IDs",
    operators: stringOperators,
  },
  {
    propertyLabel: "Título",
    key: "titulo",
    groupValuesLabel: "Títulos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de actualización",
    key: "updated_at",
    groupValuesLabel: "Fechas de actualización",
    operators: stringOperators,
  },
  {
    propertyLabel: "Puntaje",
    key: "puntaje",
    groupValuesLabel: "Puntajes",
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
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
    sortingField: "titulo",
  },
  {
    id: "updated_at",
    header: "Fecha de actualización",
    cell: (item) => item.updated_at,
    sortingField: "updated_at",
  },
  {
    id: "puntaje",
    header: "Puntaje",
    cell: (item) => item.puntaje,
    sortingField: "puntaje",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) => (
      <Badge
        color={
          item.estado == -1
            ? "red"
            : item.estado == 1
            ? "green"
            : item.estado == 2
            ? "grey"
            : item.estado == 5
            ? "blue"
            : item.estado == 6
            ? "grey"
            : item.estado == 7
            ? "red"
            : item.estado == 8
            ? "grey"
            : item.estado == 9
            ? "red"
            : "grey"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 1
          ? "Registrado"
          : item.estado == 2
          ? "Observado"
          : item.estado == 5
          ? "Enviado"
          : item.estado == 6
          ? "En proceso"
          : item.estado == 7
          ? "Anulado"
          : item.estado == 8
          ? "No registrado"
          : item.estado == 9
          ? "Duplicado"
          : "Sin estado"}
      </Badge>
    ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "titulo", visible: true },
  { id: "updated_at", visible: true },
  { id: "puntaje", visible: true },
  { id: "estado", visible: true },
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
    const res = await axiosBase.get(
      "investigador/publicaciones/propiedadInt/listado"
    );
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
            <SpaceBetween direction="horizontal" size="s">
              <ButtonDropdown
                disabled={collectionProps.selectedItems.length == 0}
                onItemClick={async ({ detail }) => {
                  if (detail.id == "action_1") {
                    const query = queryString.stringify({
                      publicacion_id: collectionProps.selectedItems[0].id,
                      tipo: "patente",
                    });
                    window.location.href =
                      "registrar/paso" +
                      collectionProps.selectedItems[0].step +
                      "?" +
                      query;
                  } else if (detail.id == "action_2") {
                    // setDeleteVisible(true);
                  } else if (detail.id == "action_3") {
                    reporte();
                  }
                }}
                items={[
                  {
                    text: "Editar",
                    id: "action_1",
                    disabled:
                      collectionProps.selectedItems[0]?.estado != 6 &&
                      collectionProps.selectedItems[0]?.estado != 2
                        ? true
                        : false,
                  },
                  {
                    text: "Eliminar",
                    id: "action_2",
                    disabled:
                      collectionProps.selectedItems[0]?.estado != 6
                        ? true
                        : false,
                  },
                  {
                    text: "Reporte",
                    id: "action_3",
                    disabled:
                      collectionProps.selectedItems[0]?.estado == 6 ||
                      collectionProps.selectedItems[0]?.estado == 2,
                  },
                ]}
              >
                Acciones para publicaciones
              </ButtonDropdown>
              <Button variant="primary">Registrar</Button>
            </SpaceBetween>
          }
        >
          Publicaciones ({distributions.length})
        </Header>
      }
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringPlaceholder="Buscar artículo"
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
