import {
  Box,
  Button,
  ButtonDropdown,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import {
  CreateUserModal,
  DeleteModal,
  EditUserModal,
} from "../components/modal.jsx";

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
    cell: (item) => item.estado,
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
  const [enableBtn, setEnableBtn] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
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
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/admin/usuarios/getUsuariosInvest"
      );
      if (!res.ok) {
        setLoading(false);
        setItems([]);
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setItems(data.data);
        setLoading(false);
      }
    } catch (error) {
      setItems([]);
      setLoading(false);
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(true);
    }
  }, [selectedItems]);

  return (
    <>
      <Table
        trackBy="codigo"
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
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      ></Table>
      <CreateUserModal visible={createVisible} setVisible={setCreateVisible} />
      <EditUserModal
        visible={editVisible}
        setVisible={setEditVisible}
        form={editForm}
        setForm={setEditForm}
      />
      <DeleteModal visible={deleteVisible} setVisible={setDeleteVisible} />
    </>
  );
};
