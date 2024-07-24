import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";

export default ({ close, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const aprobar = async () => {
    setLoading(true);
    const response = await axiosBase.put(
      "admin/estudios/convocatorias/aprobarCriterios",
      {
        id,
      }
    );
    const data = response.data;
    setLoading(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={aprobar}>
              Aprobar criterios
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Aprobar criterios"
    >
      ¿Está seguro de aprobar los criterios de esta evaluación? No podrá editar
      ni añadir más criterios
    </Modal>
  );
};
