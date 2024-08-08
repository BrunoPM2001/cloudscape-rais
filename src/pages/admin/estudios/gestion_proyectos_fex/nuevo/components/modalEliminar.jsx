import {
  Box,
  Button,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const formRules = {
  nombre: { required: true },
};

export default ({ id, reload, close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [deleting, setDeleting] = useState(false);

  //  Functions
  const eliminar = async () => {
    setDeleting(true);
    const res = await axiosBase.delete(
      "admin/estudios/proyectosFEX/deleteDoc",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setDeleting(false);
    reload();
    close();
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header={<Header>Eliminar documento</Header>}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cancelar</Button>
            <Button variant="primary" onClick={eliminar} loading={deleting}>
              Eliminar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      ¿Está seguro de eliminar este documento?
    </Modal>
  );
};
