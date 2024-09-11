import {
  Box,
  Button,
  ColumnLayout,
  DatePicker,
  FormField,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";

const initialForm = {
  titular: "",
};

const formRules = {
  titular: { required: true },
};

export default ({ close, reload, id }) => {
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
        "investigador/publicaciones/propiedadInt/addTitular",
        { ...formValues, id }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
      setLoading(false);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Agregar titular"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={agregar}>
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormField
        label="Nombre del titular"
        errorText={formErrors.titular}
        stretch
      >
        <Input
          value={formValues.titular}
          onChange={({ detail }) => handleChange("titular", detail.value)}
        />
      </FormField>
    </Modal>
  );
};
