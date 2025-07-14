import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingDelete, setLoadingDelete] = useState(false);

  //  Functions
  const eliminarIntegrante = async () => {
    setLoadingDelete(true);
    try {
      //console.log("Intentando eliminar al estudiante con ID:", id);
      const res = await axiosBase.delete(
        "investigador/convocatorias/pro-ctie/eliminarIntegrante",
        {
          params: {
            id: id,
          },
        }
      );
      //console.log("Respuesta del servidor:", res);
      const data = res.data;
      //console.log("Recargando lista de estudiantes...");
      reload();
      if(data.message === "info") {
        //console.log("Estudiante eliminado con éxito.");
        pushNotification ("Estudiante eliminado con exito.", "success", notifications.length + 1);
      } else {
        //console.log("Error al eliminar al estudiante:", data.message);
        pushNotification("Error al eliminar al estudiante. Intenta nuevamente.", "error", notifications.length+1);
      }
    } catch (error) {
      //console.log("Error al hacer la solicitud de eliminación:", error);
      pushNotification("Hubo un error al eliminar al estudiante. Intenta nuevamente.", "error", notifications.length+1);
    }

    setLoadingDelete(false);
    setVisible(false);
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={eliminarIntegrante}
              loading={loadingDelete}
            >
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar miembro del proyecto"
    >
      ¿Estás seguro de eliminar al integrante del proyecto? La acción no se
      puede deshacer
    </Modal>
  );
};
