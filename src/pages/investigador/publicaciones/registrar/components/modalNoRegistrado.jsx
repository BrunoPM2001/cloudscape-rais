import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  codigo_proyecto: "",
  titulo: "",
  entidad_financiadora: "",
};

const formRules = {
  codigo_proyecto: { required: false },
  titulo: { required: true },
  entidad_financiadora: { required: true },
};

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarProyecto = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/publicaciones/utils/agregarProyecto",
        {
          publicacion_id: id,
          codigo_proyecto: formValues.codigo_proyecto,
          nombre_proyecto: formValues.titulo,
          entidad_financiadora: formValues.entidad_financiadora,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => agregarProyecto()}
              loading={loadingCreate}
            >
              Agregar proyecto
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar proyecto registrado en la UNMSM"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <FormField
            label="Título del proyecto"
            stretch
            errorText={formErrors.titulo}
          >
            <Input
              placeholder="Escriba el título de proyecto"
              value={formValues.titulo}
              onChange={({ detail }) => handleChange("titulo", detail.value)}
            />
          </FormField>
          <FormField
            label="Código de proyecto"
            stretch
            errorText={formErrors.codigo_proyecto}
          >
            <Input
              placeholder="Escriba el código de proyecto"
              value={formValues.codigo_proyecto}
              onChange={({ detail }) =>
                handleChange("codigo_proyecto", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fuente financiadora"
            stretch
            errorText={formErrors.entidad_financiadora}
          >
            <Input
              placeholder="Escriba la fuente financiadora de proyecto"
              value={formValues.entidad_financiadora}
              onChange={({ detail }) =>
                handleChange("entidad_financiadora", detail.value)
              }
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
