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
import ModalEdit from "../components/modalEditFacultad";

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
    width: 80,
  },
  {
    id: "codigo_trabajador",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo_trabajador",
    width: 110,
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
    width: 250,
  },
  {
    id: "correo",
    header: "Correo electrónico",
    cell: (item) => item.correo,
    sortingField: "correo",
    width: 250,
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
  { id: "correo", visible: true },
  { id: "username", visible: true },
];

export default () => {
  //  Data states
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
  const [distributions, setDistribution] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
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
        selectedItems={selectedItem ? [selectedItem] : []}
        onSelectionChange={({ detail }) =>setSelectedItem(detail.selectedItems[0])}
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
                  onItemClick={({ detail }) => {
                    if (detail.id === "action_1") {
                      if (!selectedItem) {
                        alert("Seleccione un registro");
                        return;
                      }
                      setModal("editar");
                    }
                  }}
                >
                  Opciones de usuario
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModal("nuevo");
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
      {modal == "nuevo" && (
        <ModalFacultad 
          close={() => setModal("")} 
          reload={getData} 
        />
      )}
      {modal == "editar" && (
        <ModalEdit
          close={() => setModal("")}
          reload={getData}
          item={selectedItem}
        />
      )}
    </>
  );
};
