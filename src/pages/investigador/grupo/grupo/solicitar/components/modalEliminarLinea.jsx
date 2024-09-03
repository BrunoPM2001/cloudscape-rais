import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ close, reload, id, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "investigador/grupo/solicitar/eliminarLinea",
      {
        params: {
          id,
          grupo_id,
        },
      }
    );
    const data = res.data;
    setLoading(false);
    close();
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
            <Button variant="primary" onClick={eliminar} loading={loading}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar línea de investigación"
    >
      ¿Estás seguro de eliminar esta línea?
    </Modal>
  );
};
