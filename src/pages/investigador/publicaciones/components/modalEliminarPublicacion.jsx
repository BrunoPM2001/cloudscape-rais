import { Box, Button, Modal, Alert } from "@cloudscape-design/components";
import { useState, useContext } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

export default ({ close, reload, id }) => {
  const [loading, setLoading] = useState(false);
  const { notifications, pushNotification } = useContext(NotificationContext);

  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "investigador/publicaciones/utils/eliminarPublicacion",
      {
        params: {
          id: id,
        },
      }
    );
    const data = res.data;
    setLoading(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  return (
    <Modal
      visible
      onDismiss={close}
      header="Confirmar eliminación"
      footer={
        <Box float="right">
          <Button variant="link" onClick={close}>
            Cancelar
          </Button>
          <Button variant="primary" loading={loading} onClick={eliminar}>
            Eliminar
          </Button>
        </Box>
      }
    >
      <Alert header="Advertencia" type="warning">
        Esta acción eliminará permanentemente la publicación. Asegúrate de que
        realmente deseas continuar.
      </Alert>
    </Modal>
  );
};
