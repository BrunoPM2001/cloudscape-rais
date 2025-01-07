import {
  Box,
  Button,
  Modal,
  SpaceBetween,
  Alert,

} from "@cloudscape-design/components";
import { useState, useContext } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

export default ({ close, reload, id }) => {
  const [loadingEliminando, setLoadingEliminando] = useState(false);
  const { notifications, pushNotification } = useContext(NotificationContext);

  const eliminar = async () => {
    setLoadingEliminando(true);
    const res = await axiosBase.delete(
      "investigador/publicaciones/utils/eliminarPublicacion",
      {
        params: {
          id: id,
        },
      }
    );
    const data = res.data;
    setLoadingEliminando(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
    close();
  };



  return (

    <Modal
      onDismiss={close}
      visible={true} // Asegúrate de que `visible` esté configurado correctamente
      closeAriaLabel="Cerrar modal"
      header="Confirmar eliminación"
      footer={
        <Box float="right">
          <Button variant="link" onClick={close}>Cancelar</Button>
          <Button variant="primary" loading={loadingEliminando} onClick={() => { eliminar(); close(); }}>Eliminar</Button>
        </Box>
      }

    >
      <SpaceBetween size="m">
        <Alert
          statusIconAriaLabel="Info"
          header="Advertencia"
        >
          Esta acción eliminará permanentemente la publicación. Asegúrate de que
          realmente deseas continuar.
        </Alert>
      </SpaceBetween>
      ¿Estás seguro de que deseas eliminar esta publicación?
    </Modal>
  );
};
