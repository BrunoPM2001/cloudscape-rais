import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState, useContext } from "react";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingBtn, setLoadingBtn] = useState(false);

  const eliminar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.delete(
      "investigador/informes/monitoreo/eliminarPublicacion",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoadingBtn(false);
    reload();
    close();
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loadingBtn} onClick={eliminar}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar publicación"
    >
      ¿Está seguro de querer eliminar esta publicación del registro de metas del
      proyecto?
    </Modal>
  );
};
