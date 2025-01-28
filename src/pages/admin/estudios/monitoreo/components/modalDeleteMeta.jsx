import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ close, reload, id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "admin/estudios/monitoreo/eliminarMeta",
      {
        params: { id },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoading(false);
    close();
    reload();
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Eliminar meta"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={eliminar}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      ¿Está seguro de querer eliminar esta meta?
    </Modal>
  );
};
