import {
  Badge,
  Box,
  Button,
  ButtonDropdown,
  Header,
  Pagination,
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
    propertyLabel: "Nombre",
    key: "grupo_nombre",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Categoría",
    key: "grupo_categoria",
    groupValuesLabel: "Categorías",
    operators: stringOperators,
  },
  {
    propertyLabel: "Condición",
    key: "condicion",
    groupValuesLabel: "Condiciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cargo",
    key: "cargo",
    groupValuesLabel: "Cargos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Fecha de resolución",
    key: "resolucion_fecha",
    groupValuesLabel: "Fechas de resolución",
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
    header: "Nombre",
    cell: (item) => item.grupo_nombre,
    sortingField: "grupo_nombre",
  },
  {
    id: "grupo_categoria",
    header: "Categoría",
    cell: (item) => item.grupo_categoria,
    sortingField: "grupo_categoria",
  },
  {
    id: "condicion",
    header: "Condición",
    cell: (item) => item.condicion,
    sortingField: "condicion",
  },
  {
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
    sortingField: "cargo",
  },
  {
    id: "resolucion_fecha",
    header: "Fecha de resolución",
    cell: (item) => item.resolucion_fecha,
    sortingField: "resolucion_fecha",
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
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "grupo_nombre", visible: true },
  { id: "grupo_categoria", visible: true },
  { id: "condicion", visible: true },
  { id: "cargo", visible: true },
  { id: "resolucion_fecha", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [distributions, setDistribution] = useState([]);
  const { items, actions, collectionProps, paginationProps } = useCollection(
    distributions,
    {
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
    }
  );

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/listadoSolicitudes");
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
          actions={
            <SpaceBetween direction="horizontal" size="s">
              <ButtonDropdown
                disabled={!collectionProps.selectedItems.length}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    const query = queryString.stringify({
                      id: collectionProps.selectedItems[0].id,
                    });
                    window.location.href =
                      "grupo/solicitar/paso" +
                      collectionProps.selectedItems[0].step +
                      "?" +
                      query;
                  } else if (detail.id == "action_2") {
                    // setDeleteVisible(true);
                  }
                }}
                items={[
                  {
                    text: "Editar",
                    id: "action_1",
                    disabled:
                      collectionProps.selectedItems[0]?.estado != "Observado" &&
                      collectionProps.selectedItems[0]?.estado != "En proceso",
                  },
                  {
                    text: "Eliminar",
                    id: "action_2",
                    disabled: false,
                  },
                ]}
              >
                Acciones para solicitudes
              </ButtonDropdown>
              <Button
                variant="primary"
                disabled={loading || items.length > 0}
                onClick={() => (window.location.href = "grupo/solicitar/paso1")}
              >
                Registrar
              </Button>
            </SpaceBetween>
          }
        >
          Solicitudes ({distributions.length})
        </Header>
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
