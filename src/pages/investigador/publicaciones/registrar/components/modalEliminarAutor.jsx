import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const eliminarAutor = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "investigador/publicaciones/eliminarAutor",
      {
        params: {
          id: id,
        },
      }
    );
    const data = res.data;
    setLoading(false);
    setVisible(false);
    reload();
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={eliminarAutor} loading={loading}>
              Eliminar autor
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar autor de la publicación"
    >
      ¿Estás seguro de eliminar a este autor de la publicación? La acción no se
      puede deshacer
    </Modal>
  );
};
