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
import ModalFacultad from "../components/modalFacultad";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "ID",
    key: "id",
    groupValuesLabel: "IDs",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código trabajador",
    key: "codigo_trabajador",
    groupValuesLabel: "Códigos de trabajador",
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
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
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
    id: "codigo_trabajador",
    header: "Código trabajador",
    cell: (item) => item.codigo_trabajador,
    sortingField: "codigo_trabajador",
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
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
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
  { id: "facultad", visible: true },
  { id: "codigo_trabajador", visible: true },
  { id: "apellidos", visible: true },
  { id: "nombres", visible: true },
  { id: "username", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
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
      "admin/facultad/gestionUFacultad/listado"
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
                  Opciones de usuario
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModal("evaluador");
                  }}
                >
                  Nuevo usuario
                </Button>
              </SpaceBetween>
            }
          >
            Listado de usuarios facultad
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
      {modal == "evaluador" && (
        <ModalFacultad close={() => setModal("")} reload={getData} />
      )}
    </>
  );
};
