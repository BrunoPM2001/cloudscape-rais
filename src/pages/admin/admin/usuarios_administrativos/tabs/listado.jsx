import {
  Header,
  Table,
  Box,
  SpaceBetween,
  ButtonDropdown,
  Button,
  Badge,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import {
  CreateUserModal,
  DeleteModal,
  EditUserModal,
  ResetPasswordModal,
} from "../components/modal.jsx";
import axiosBase from "../../../../../api/axios.js";

const columnDefinitions = [
  {
    id: "username",
    header: "Nombre de usuario",
    cell: (item) => item.username,
    sortingField: "username",
    isRowHeader: true,
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
    id: "telefono_movil",
    header: "Teléfono móvil",
    cell: (item) => item.telefono_movil,
    sortingField: "telefono_movil",
  },
  {
    id: "cargo",
    header: "Cargo",
    cell: (item) => item.cargo,
    sortingField: "cargo",
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
  { id: "username", visible: true },
  { id: "apellido1", visible: true },
  { id: "apellido2", visible: true },
  { id: "nombres", visible: true },
  { id: "telefono_movil", visible: true },
  { id: "cargo", visible: true },
  { id: "estado", visible: true },
];

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [enableBtn, setEnableBtn] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("admin/admin/usuarios/getUsuariosAdmin");
    const data = await res.data;
    setItems(data.data);
    setLoading(false);
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log(selectedItems[0]);
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [selectedItems]);

  return (
    <>
      <Table
        trackBy="username"
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
            counter={`(${items.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  disabled={!enableBtn}
                  onItemClick={({ detail }) => {
                    if (detail.id == "action_1") {
                      setEditVisible(true);
                    } else if (detail.id == "action_2") {
                      setPasswordVisible(true);
                    } else if (detail.id == "action_3") {
                      setDeleteVisible(true);
                    }
                  }}
                  items={[
                    {
                      text: "Editar",
                      id: "action_1",
                      disabled: false,
                    },
                    {
                      text: "Reinicar contraseña",
                      id: "action_2",
                      disabled: false,
                    },
                    {
                      text: "Eliminar",
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
                  Crear usuario administrador
                </Button>
              </SpaceBetween>
            }
          >
            Usuarios administradores
          </Header>
        }
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
      {editVisible && (
        <EditUserModal
          visible={editVisible}
          setVisible={setEditVisible}
          id={selectedItems}
          reload={getData}
        />
      )}
      {deleteVisible && (
        <DeleteModal
          visible={deleteVisible}
          setVisible={setDeleteVisible}
          item={selectedItems}
        />
      )}
      {passwordVisible && (
        <ResetPasswordModal
          visible={passwordVisible}
          setVisible={setPasswordVisible}
          item={selectedItems}
        />
      )}
    </>
  );
};
