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
  Alert,
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

export default ({ id, close, reload, rangoFechas  }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [dateAlert, setDateAlert] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const minDate = new Date(rangoFechas?.fecha_inicial);
  const maxDate = new Date(rangoFechas?.fecha_final);

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
          "investigador/convocatorias/pconfigi/addActividad",
          { ...formValues, id }
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
                const fin = new Date(formValues.fecha_fin);

                if (formValues.fecha_fin) {
                  return date >= minDate && date <= fin;
                }
                return date >= minDate && date <= maxDate;
              }}
              dateDisabledReason={() => {
                return "Fecha fuera de rango permitido";
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
                const inicio = new Date(formValues.fecha_inicio);

                if (formValues.fecha_inicio) {
                  return date >= inicio && date <= maxDate;
                }
                return date >= minDate && date <= maxDate;
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
