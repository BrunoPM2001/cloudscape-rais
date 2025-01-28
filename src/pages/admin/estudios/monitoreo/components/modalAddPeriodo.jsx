import {
  Box,
  Button,
  FormField,
  Input,
  Modal,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const initialForm = {
  periodo: "",
  descripcion: "",
};

const formRules = {
  periodo: { required: true },
};

export default ({ close, reload }) => {
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
        "admin/estudios/monitoreo/agregarPeriodo",
        formValues
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      close();
      reload();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Agregar periodo"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={agregar}>
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <FormField label="Periodo" errorText={formErrors.periodo} stretch>
          <Input
            placeholder="Escriba el año"
            type="number"
            value={formValues.periodo}
            onChange={({ detail }) => handleChange("periodo", detail.value)}
          />
        </FormField>
        <FormField
          label="Descripción"
          errorText={formErrors.descripcion}
          stretch
        >
          <Textarea
            value={formValues.descripcion}
            onChange={({ detail }) => handleChange("descripcion", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
