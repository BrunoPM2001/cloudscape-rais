import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  DatePicker,
  FormField,
  Input,
  ColumnLayout,
  Alert,
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

export default ({ id, close, reload, rangoFechas }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [dateAlert, setDateAlert] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarActividad = async () => {
    if (validateForm()) {
      if (
        formValues.fecha_inicio <= formValues.fecha_fin &&
        formValues.fecha_inicio >= rangoFechas.fecha_inicial &&
        formValues.fecha_fin <= rangoFechas.fecha_final
      ) {
        setLoadingCreate(true);
        const res = await axiosBase.post(
          "investigador/convocatorias/pro-ctie/agregarActividad",
          { ...formValues, proyecto_id: id }
        );
        const data = res.data;
        setLoadingCreate(false);
        close();
        reload();
        pushNotification(data.detail, data.message, notifications.length + 1);
      } else {
        setDateAlert(true);
      }
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
      <SpaceBetween direction="vertical" size="s">
        {dateAlert && (
          <Alert
            header="Error en las fechas"
            type="warning"
            dismissible
            onDismiss={() => setDateAlert(false)}
          />
        )}
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
              isDateEnabled={(date) => {
                const newDate = new Date(formValues.fecha_fin);
                const limit = new Date(rangoFechas?.fecha_inicial);
                if (formValues.fecha_fin != "") {
                  return date < newDate && date > limit;
                } else {
                  return date > limit;
                }
              }}
              dateDisabledReason={() => {
                return "La fecha inicial no puede ser mayor a la fecha final";
              }}
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
              isDateEnabled={(date) => {
                const limit = new Date(rangoFechas?.fecha_final);
                const newDate = new Date(formValues.fecha_inicio);
                if (formValues.fecha_inicio != "") {
                  return date > newDate && date < limit;
                } else {
                  return date < limit;
                }
              }}
              dateDisabledReason={() => {
                return "La fecha final no puede ser menor a la fecha inicial";
              }}
              onChange={({ detail }) => handleChange("fecha_fin", detail.value)}
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Modal>
  );
};
