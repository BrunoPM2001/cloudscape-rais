import {
  Modal,
  Box,
  Button,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";

export default ({ close, item, reload, closeParent }) => {
    // Context
  const { notifications, pushNotification } = useContext(NotificationContext);

    // State
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const getGrupos = async () => {
    const res = await axiosBase.get(
      "admin/admin/lineasInvestigacion/grupos/" + item.id
    );
    setGrupos(res.data.data);
    setLoading(false);
  };

  const eliminar = async () => {
    setLoadingDelete(true);

    const res = await axiosBase.delete(
      "admin/admin/lineasInvestigacion/delete/" + item.id
    );

    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);

    if (data.message === "success") {
      reload();
      close();
      closeParent();
    }

    setLoadingDelete(false);
  };

  useEffect(() => {
    getGrupos();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      header="Eliminar línea de investigación"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cancelar</Button>
            <Button
              variant="danger"
              disabled={grupos.length > 0}
              loading={loadingDelete}
              onClick={eliminar}
            >
              Confirmar eliminación
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box>
          ⚠️ ¿Estás seguro de eliminar esta línea de investigación?
        </Box>

        {grupos.length > 0 && (
          <Box color="text-status-error">
            Esta línea está vinculada a grupos y no puede eliminarse.
          </Box>
        )}

        <Table
          items={grupos}
          loading={loading}
          columnDefinitions={[
            { id: "id", header: "ID", cell: (e) => e.id },
            { id: "nombre", header: "Grupo", cell: (e) => e.nombre },
          ]} 
          empty={
            <Box textAlign="center">
            No hay grupos vinculados a esta línea de investigación
            </Box>
          }
        />
      </SpaceBetween>
    </Modal>
  );
};