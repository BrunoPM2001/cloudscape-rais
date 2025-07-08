import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingDelete, setLoadingDelete] = useState(false);

  //  Functions
  const eliminarPartida = async () => {
    setLoadingDelete(true);
    const res = await axiosBase.delete(
      "investigador/convocatorias/pro-ctie/eliminarPartida",
      {
        params: {
          id: id,
        },
      }
    );
    const data = res.data;
    setLoadingDelete(false);
    setVisible(false);
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={eliminarPartida}
              loading={loadingDelete}
            >
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar partida del proyecto"
    >
      ¿Estás seguro de eliminar esta partida del presupuesto? La acción no se
      puede deshacer
    </Modal>
  );
};
