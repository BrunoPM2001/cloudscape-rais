import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  linea_investigacion_id: null,
};

const formRules = {
  linea_investigacion_id: { required: true },
};

export default ({ close, reload, listado }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/grupo/solicitar/agregarLinea",
        formValues
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
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
            <Button variant="primary" onClick={agregar} loading={loadingCreate}>
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar línea de investigación"
    >
      <SpaceBetween size="s">
        <FormField
          label="Lineas"
          stretch
          errorText={formErrors.linea_investigacion_id}
        >
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.linea_investigacion_id}
            onChange={({ detail }) =>
              handleChange("linea_investigacion_id", detail.selectedOption)
            }
            options={listado}
            virtualScroll
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
