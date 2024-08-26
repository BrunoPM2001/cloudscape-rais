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
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const formRules = {
  actividad: { required: true },
  fecha_inicio: { required: true },
  fecha_fin: { required: true },
  duracion: { required: true },
};

export default ({ close, reload, item }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(item, formRules);

  //  Functions
  const actualizar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "investigador/convocatorias/pinvpos/actualizarActividad",
        formValues
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
      header="Actualizar actividad"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={actualizar}>
              Actualizar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <FormField label="Actividad" errorText={formErrors.actividad} stretch>
          <Input
            value={formValues.actividad}
            onChange={({ detail }) => handleChange("actividad", detail.value)}
          />
        </FormField>
        <ColumnLayout columns={2}>
          <FormField
            label="Fecha de inicio"
            errorText={formErrors.fecha_inicio}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_inicio}
              onChange={({ detail }) =>
                handleChange("fecha_inicio", detail.value)
              }
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
            />
          </FormField>
          <FormField
            label="Fecha de fin"
            errorText={formErrors.fecha_fin}
            stretch
          >
            <DatePicker
              placeholder="YYYY/MM/DD"
              value={formValues.fecha_fin}
              onChange={({ detail }) => handleChange("fecha_fin", detail.value)}
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
            />
          </FormField>
        </ColumnLayout>
        <FormField
          label="Duración"
          description="Horas efectivas"
          errorText={formErrors.duracion}
          stretch
        >
          <Input
            type="number"
            value={formValues.duracion}
            onChange={({ detail }) => handleChange("duracion", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
