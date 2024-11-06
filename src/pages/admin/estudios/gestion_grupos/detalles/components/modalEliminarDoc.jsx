import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";

export default ({ close, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete("admin/estudios/grupos/eliminarDoc", {
      params: {
        id,
      },
    });
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
      size="medium"
      header="Eliminar documento"
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
      ¿Estás seguro de eliminar este documento?
    </Modal>
  );
};
