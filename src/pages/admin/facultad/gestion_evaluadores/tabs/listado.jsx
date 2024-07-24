import {
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
import axiosBase from "../../../../../api/axios";
import ModalEvaluador from "../components/modalEvaluador";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDs",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellidos",
    key: "apellidos",
    groupValuesLabel: "Apellidos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombres",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Institución",
    key: "institucion",
    groupValuesLabel: "Instituciones",
    operators: stringOperators,
  },
  {
    propertyLabel: "Tipo",
    key: "tipo",
    groupValuesLabel: "Tipos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Cargo",
    key: "cargo",
    groupValuesLabel: "Cargos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Usuario",
    key: "username",
    groupValuesLabel: "Nombres de usuarios",
    operators: stringOperators,
  },
];

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
    sortingField: "id",
  },
  {
    id: "apellidos",
    header: "Apellidos",
    cell: (item) => item.apellidos,
    sortingField: "apellidos",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "institucion",
    header: "Institución",
    cell: (item) => item.institucion,
    sortingField: "institucion",
  },
  {
    id: "tipo",
    header: "Tipo",
    cell: (item) => item.tipo,
    sortingField: "tipo",
  },
  {
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
    sortingField: "cargo",
  },
  {
    id: "username",
    header: "Usuario",
    cell: (item) => item.username,
    sortingField: "username",
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "apellidos", visible: true },
  { id: "nombres", visible: true },
  { id: "institucion", visible: true },
  { id: "tipo", visible: true },
  { id: "cargo", visible: true },
  { id: "username", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/facultad/gestionEvaluadores/listado"
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
        header={
          <Header
            counter={
              collectionProps.selectedItems.length
                ? "(" + distributions.length + "/" + items.length + ")"
                : "(" + distributions.length + ")"
            }
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <ButtonDropdown
                  items={[
                    {
                      id: "action_1",
                      text: "Editar",
                    },
                  ]}
                >
                  Opciones de evaluador
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Nuevo evaluador
                </Button>
              </SpaceBetween>
            }
          >
            Listado de usuarios evaluadores
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
      {visible && (
        <ModalEvaluador close={() => setVisible(false)} reload={getData} />
      )}
    </>
  );
};
