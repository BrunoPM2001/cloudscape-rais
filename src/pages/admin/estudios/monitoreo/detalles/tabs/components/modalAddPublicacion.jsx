import {
  Box,
  Button,
  Modal,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import axiosBase from "../../../../../../../api/axios";
import { useCollection } from "@cloudscape-design/collection-hooks";
import NotificationContext from "../../../../../../../providers/notificationProvider";

const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item) => item.id,
  },
  {
    id: "titulo",
    header: "Título",
    cell: (item) => item.titulo,
  },
  {
    id: "periodo",
    header: "Año",
    cell: (item) => item.periodo,
  },
  {
    id: "proyectos_asociados",
    header: "Cantidad de proyectos asociados",
    cell: (item) => item.proyectos_asociados,
  },
];

const columnDisplay = [
  { id: "id", visible: true },
  { id: "titulo", visible: true },
  { id: "periodo", visible: true },
  { id: "proyectos_asociados", visible: true },
];

export default ({ tipo_publicacion, id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState([]);

  //  Hooks
  const { items, actions, collectionProps } = useCollection(data, {
    sorting: {},
    selection: {},
  });

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/monitoreo/publicacionesDisponibles",
      {
        params: {
          tipo_publicacion,
          id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const agregar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.post(
      "admin/estudios/monitoreo/agregarPublicacion",
      {
        proyecto_id: id,
        publicacion_id: collectionProps.selectedItems[0].id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    reload();
    close();
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cerrar</Button>
            <Button
              variant="primary"
              disabled={!collectionProps.selectedItems.length}
              loading={loadingBtn}
              onClick={agregar}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Añadir publicación"
    >
      <Table
        {...collectionProps}
        trackBy="id"
        items={items}
        columnDefinitions={columnDefinitions}
        columnDisplay={columnDisplay}
        loading={loading}
        loadingText="Cargando datos"
        wrapLines
        variant="embedded"
        selectionType="single"
        isItemDisabled={(item) => item.proyectos_asociados > 0}
        onRowClick={({ detail }) => {
          if (detail.item.proyectos_asociados == 0) {
            actions.setSelectedItems([detail.item]);
          }
        }}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay registros...</b>
            </SpaceBetween>
          </Box>
        }
      />
    </Modal>
  );
};
