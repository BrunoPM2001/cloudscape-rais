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
  Select,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

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

export default ({ id, close, reload, reset }) => {
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
        "investigador/convocatorias/pconfigi_inv/addActividad",
        { ...formValues, id }
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reset();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
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
      <Form>
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
                isDateEnabled={(date) => {
                  if (formValues.fecha_fin != "") {
                    const newDate = new Date(formValues.fecha_fin);
                    return date < newDate;
                  } else {
                    return true;
                  }
                }}
                dateDisabledReason={() => {
                  return "La fecha inicial no puede ser mayor a la fecha final";
                }}
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
                isDateEnabled={(date) => {
                  if (formValues.fecha_inicio != "") {
                    const newDate = new Date(formValues.fecha_inicio);
                    return date > newDate;
                  } else {
                    return true;
                  }
                }}
                dateDisabledReason={() => {
                  return "La fecha final no puede ser menor a la fecha inicial";
                }}
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
