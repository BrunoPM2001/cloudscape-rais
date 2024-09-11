import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";

export default ({ close, reload, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "investigador/publicaciones/propiedadInt/deleteTitular",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    close();
    reload();
    setLoading(false);
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Eliminar titular"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={eliminar}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      ¿Desea eliminar al titular?
    </Modal>
  );
};
