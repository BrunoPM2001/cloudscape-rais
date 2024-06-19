import {
  Modal,
  Box,
  SpaceBetween,
  Form,
  Button,
  DatePicker,
  FormField,
  Input,
  ColumnLayout,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  actividad: "",
  fecha_inicio: "",
  fecha_fin: "",
};

const formRules = {
  actividad: { required: true },
  fecha_inicio: { required: true },
  fecha_fin: { required: true },
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
  const agregarActividad = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/agregarActividad",
        { ...formValues, proyecto_id: id }
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
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarActividad}
              loading={loadingCreate}
            >
              Incluir actividad
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir actividad al proyecto"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Actividad" stretch errorText={formErrors.actividad}>
            <Input
              placeholder="Escriba el nombre de la actividad"
              value={formValues.actividad}
              onChange={({ detail }) => handleChange("actividad", detail.value)}
            />
          </FormField>
          <ColumnLayout columns={2}>
            <FormField
              label="Fecha de inicio"
              stretch
              errorText={formErrors.fecha_inicio}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_inicio}
                onChange={({ detail }) =>
                  handleChange("fecha_inicio", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de fin"
              stretch
              errorText={formErrors.fecha_fin}
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_fin}
                onChange={({ detail }) =>
                  handleChange("fecha_fin", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
