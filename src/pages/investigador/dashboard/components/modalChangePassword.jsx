import {
  Alert,
  Box,
  Button,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import axiosBase from "../../../../api/axios";

const initialForm = {
  currentPass: "",
  newPass: "",
  newPassAgain: "",
};

const formRules = {
  currentPass: { required: true },
  newPass: {
    required: true,
    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  },
  newPassAgain: {
    required: true,
    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  },
};

export default ({ close }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const updatePass = async () => {
    if (validateForm()) {
      setLoading(true);
      const response = await axiosBase.post(
        "investigador/perfil/updatePassword",
        formValues
      );
      const res = response.data;
      if (res.message == "success") {
        pushNotification(res.detail, res.message, notifications.length + 1);
        close();
      } else if (res.message == "error") {
        setAlert(res.detail);
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header={
        <Header description="Su nueva contraseña debe contar al menos con 8 caracteres, una mayúscula, una minúscula y algún caracter no alfanumérico">
          Actualizar contraseña
        </Header>
      }
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={updatePass}>
              Cambiar contraseña
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m" direction="vertical">
        {alert != "" && (
          <Alert
            dismissible
            type="warning"
            header={alert}
            onDismiss={() => setAlert("")}
          />
        )}
        <FormField
          label="Contraseña actual"
          errorText={formErrors.currentPass}
          stretch
        >
          <Input
            placeholder="Escriba su contraseña actual"
            type="password"
            value={formValues.currentPass}
            onChange={({ detail }) => handleChange("currentPass", detail.value)}
          />
        </FormField>
        <FormField
          label="Contraseña nueva"
          errorText={formErrors.newPass}
          stretch
        >
          <Input
            placeholder="Escriba su contraseña nueva"
            type="password"
            value={formValues.newPass}
            onChange={({ detail }) => handleChange("newPass", detail.value)}
          />
        </FormField>
        <FormField
          label="Repita la nueva contraseña"
          errorText={formErrors.newPassAgain}
          stretch
        >
          <Input
            placeholder="Escriba su contraseña nueva de nuevo"
            type="password"
            value={formValues.newPassAgain}
            onChange={({ detail }) =>
              handleChange("newPassAgain", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
