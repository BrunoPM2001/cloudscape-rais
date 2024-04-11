import {
  Header,
  Table,
  Box,
  SpaceBetween,
  ButtonDropdown,
  Button,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import Modal from "../components/modal.jsx";

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
    cell: (item) => item.estado,
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
  const [visible, setVisible] = useState(true);

  //  Functions
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/api/admin/admin/usuarios/getUsuariosAdmin"
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
                  Acciones para usuario
                </ButtonDropdown>
                <Button variant="primary" onClick={() => setVisible(true)}>
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
      <Modal visible={visible} setVisible={setVisible} />
    </>
  );
};
