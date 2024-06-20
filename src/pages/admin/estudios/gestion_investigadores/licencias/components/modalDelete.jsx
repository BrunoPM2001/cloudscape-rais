import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";

export default ({ visible, setVisible, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const deleteLicencia = async () => {
    setLoading(true);
    const response = await axiosBase.delete(
      "admin/estudios/investigadores/deleteLicencia",
      {
        params: {
          id: id,
        },
      }
    );
    const data = response.data;
    setLoading(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
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
            <Button
              variant="primary"
              loading={loading}
              onClick={deleteLicencia}
            >
              Eliminar licencia
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar licencia a investigador"
    >
      ¿Está seguro de eliminar esta licencia? Esta acción no se puede deshacer
    </Modal>
  );
};
