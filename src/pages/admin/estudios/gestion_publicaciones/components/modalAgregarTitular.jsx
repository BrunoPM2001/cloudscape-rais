import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  titular: "",
};

const formRules = {
  titular: { required: true },
};

export default ({ id, reload, close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.post(
        "admin/estudios/patentes/agregarTitular",
        {
          ...formValues,
          patente_id: id,
        }
      );
      const data = res.data;
      setLoading(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregar} loading={loading}>
              Incluir titular
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar autor"
    >
      <FormField
        label="Nombre del titular"
        errorText={formErrors.titular}
        stretch
      >
        <Input
          placeholder="Escriba el nombre del titular"
          value={formValues.titular}
          onChange={({ detail }) => handleChange("titular", detail.value)}
        />
      </FormField>
    </Modal>
  );
};
