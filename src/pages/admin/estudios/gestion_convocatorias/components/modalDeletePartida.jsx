import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const deletePartida = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "admin/estudios/convocatorias/deletePartida",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setLoading(false);
    // pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={deletePartida}>
              ELiminar partida
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar criterio"
    >
      ¿Desea eliminar la partida de este grupo?
    </Modal>
  );
};
