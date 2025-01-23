import {
  Box,
  Button,
  Modal,
  SpaceBetween,
  Alert,
} from "@cloudscape-design/components";
import { useState, useContext } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ close, reload, id }) => {
  //  States
  const [loading, setLoading] = useState(false);
  const { notifications, pushNotification } = useContext(NotificationContext);

  const eliminar = async () => {
    setLoading(true);
    const res = await axiosBase.delete(
      "investigador/convocatorias/pmulti/eliminarPropuesta",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoading(false);
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
      <Alert type="warning">
        Esta acción eliminará permanentemente la propuesta de Proyecto. ¿Seguro
        que quieres realizar esta acción?
      </Alert>
    </Modal>
  );
};
