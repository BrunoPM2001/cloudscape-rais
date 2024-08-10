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

export default ({ item, reload, close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [updating, setUpdating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(item, formRules);

  //  Functions
  const actualizar = async () => {
    if (validateForm()) {
      setUpdating(true);
      const res = await axiosBase.put(
        "admin/estudios/proyectosFEX/updateDoc",
        formValues
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setUpdating(false);
      reload();
      close();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Editar documento"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={close}>Cancelar</Button>
            <Button variant="primary" onClick={actualizar} loading={updating}>
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField
          label="Nombre de documento"
          errorText={formErrors.nombre}
          stretch
        >
          <Input
            value={formValues.nombre}
            onChange={({ detail }) => handleChange("nombre", detail.value)}
          />
        </FormField>
        <FormField label="Comentario" stretch>
          <Input
            value={formValues.comentario}
            onChange={({ detail }) => handleChange("comentario", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
