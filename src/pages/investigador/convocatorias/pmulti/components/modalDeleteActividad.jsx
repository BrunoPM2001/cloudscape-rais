import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";

export default ({ id, close, reload, reset }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingDelete, setLoadingDelete] = useState(false);

  //  Functions
  const eliminarActividad = async () => {
    setLoadingDelete(true);
    const res = await axiosBase.delete(
      "investigador/convocatorias/pmulti/eliminarActividad",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setLoadingDelete(false);
    close();
    reset();
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={eliminarActividad}
              loading={loadingDelete}
            >
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar actividad del proyecto"
    >
      ¿Estás seguro de eliminar esta actividad del calendario?
    </Modal>
  );
};
