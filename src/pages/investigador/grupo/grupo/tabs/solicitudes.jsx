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
          item.estado == -1
            ? "red"
            : item.estado == 0
            ? "grey"
            : item.estado == 2
            ? "red"
            : item.estado == 6
            ? "blue"
            : "red"
        }
      >
        {item.estado == -1
          ? "Eliminado"
          : item.estado == 0
          ? "No aprobado"
          : item.estado == 2
          ? "Observado"
          : item.estado == 6
          ? "En proceso"
          : "Estado desconocido"}
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
  const [selectedItems, setSelectedItems] = useState([]);
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
  const [enableBtn, setEnableBtn] = useState(true);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/listadoSolicitudes");
    const data = res.data;
    setDistribution(data.data);
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
          actions={
            <SpaceBetween direction="horizontal" size="s">
              <ButtonDropdown
                disabled={!enableBtn}
                onItemClick={({ detail }) => {
                  if (detail.id == "action_1") {
                    // setEditVisible(true);
                  } else if (detail.id == "action_2") {
                    // setDeleteVisible(true);
                  }
                }}
                items={[
                  {
                    text: "Editar",
                    id: "action_1",
                    disabled: false,
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
