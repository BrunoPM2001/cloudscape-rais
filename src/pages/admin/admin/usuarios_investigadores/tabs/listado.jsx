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
import {
  CreateUserModal,
  ResetPasswordModal,
  DeleteModal,
  TemporalModal,
} from "../components/modal.jsx";
import { useCollection } from "@cloudscape-design/collection-hooks";
import axiosBase from "../../../../../api/axios";

const stringOperators = [":", "!:", "=", "!=", "^", "!^"];

const FILTER_PROPS = [
  {
    propertyLabel: "Facultad",
    key: "facultad",
    groupValuesLabel: "Facultades",
    operators: stringOperators,
  },
  {
    propertyLabel: "Código",
    key: "codigo",
    groupValuesLabel: "Códigos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellido paterno",
    key: "apellido1",
    groupValuesLabel: "Apellidos paternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Apellido materno",
    key: "apellido2",
    groupValuesLabel: "Apellidos maternos",
    operators: stringOperators,
  },
  {
    propertyLabel: "Nombre",
    key: "nombres",
    groupValuesLabel: "Nombres",
    operators: stringOperators,
  },
  {
    propertyLabel: "Sexo",
    key: "sexo",
    groupValuesLabel: "Sexos",
    operators: stringOperators,
  },
  {
    propertyLabel: "N° de documento",
    key: "doc_numero",
    groupValuesLabel: "Documentos de identidad",
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
    id: "facultad",
    header: "Facultad",
    cell: (item) => item.facultad,
    sortingField: "facultad",
    isRowHeader: true,
  },
  {
    id: "codigo",
    header: "Código",
    cell: (item) => item.codigo,
    sortingField: "codigo",
  },
  {
    id: "apellido1",
    header: "Apellido Paterno",
    cell: (item) => item.apellido1,
    sortingField: "apellido1",
  },
  {
    id: "apellido2",
    header: "Apellido Materno",
    cell: (item) => item.apellido2,
    sortingField: "apellido2",
  },
  {
    id: "nombres",
    header: "Nombres",
    cell: (item) => item.nombres,
    sortingField: "nombres",
  },
  {
    id: "sexo",
    header: "Sexo",
    cell: (item) => item.sexo,
    sortingField: "sexo",
  },
  {
    id: "email",
    header: "Correo",
    cell: (item) => item.email,
    sortingField: "email",
  },
  {
    id: "doc_numero",
    header: "Número de documento",
    cell: (item) => item.doc_numero,
    sortingField: "doc_numero",
  },
  {
    id: "estado",
    header: "Estado",
    cell: (item) =>
      item.estado == 1 ? (
        <Badge color="green">Activo</Badge>
      ) : (
        <Badge color="red">Inactivo</Badge>
      ),
    sortingField: "estado",
  },
];

const columnDisplay = [
  { id: "facultad", visible: true },
  { id: "codigo", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "sexo", visible: true },
  { id: "email", visible: true },
  { id: "doc_numero", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  States
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  const [enableBtn, setEnableBtn] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [temporalVisible, setTemporalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    facultad: null,
    codigo: null,
    paterno: null,
    materno: null,
    nombres: null,
    sexo: null,
    email: null,
    doc_numero: null,
    estado: null,
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/usuarios/getUsuariosInvestigadores"
    );
    const data = await res.data;
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
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + selectedItems.length + "/" + items.length + ")"
                : "(" + items.length + ")"
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={!enableBtn}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setPassVisible(true);
                    } else if (detail.id == "action_2") {
                      setDeleteVisible(true);
                    } else if (detail.id == "action_3") {
                      setTemporalVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Reestablecer contraseña",
                      id: "action_1",
                      disabled: false,
                    },
                    {
                      text: "Eliminar",
                      id: "action_2",
                      disabled: false,
                    },
                    {
                      text: "Asignar temporal",
                      id: "action_3",
                      disabled: false,
                    },
                  ]}
                >
                  Acciones para usuario
                </ButtonDropdown>
                <Button
                  variant="primary"
                  onClick={() => setCreateVisible(true)}
                >
                  Crear usuario investigador
                </Button>
              </SpaceBetween>
            }
          >
            Usuarios investigadores
          </Header>
        }
        filter={
          <PropertyFilter
            {...propertyFilterProps}
            filteringPlaceholder="Buscar investigador"
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
      ></Table>
      {createVisible && (
        <CreateUserModal
          visible={createVisible}
          setVisible={setCreateVisible}
          reload={getData}
        />
      )}
      {passVisible && (
        <ResetPasswordModal
          visible={passVisible}
          setVisible={setPassVisible}
          item={selectedItems}
        />
      )}
      {deleteVisible && (
        <DeleteModal
          visible={deleteVisible}
          setVisible={setDeleteVisible}
          item={selectedItems}
          reload={getData}
        />
      )}
      {temporalVisible && (
        <TemporalModal
          visible={temporalVisible}
          setVisible={setTemporalVisible}
          item={selectedItems}
        />
      )}
    </>
  );
};
