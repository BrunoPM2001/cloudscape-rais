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
  actividad: { 
    required: true,
  },
  fecha_inicio: { required: true },
  fecha_fin: { 
    required: true,
    custom: (value, values) => {
      const fechaInicioStr = values.fecha_inicio;
      if (!fechaInicioStr) {
        return "Debes seleccionar primero la fecha de inicio.";
      }
      // Comprobar si fecha_fin es mayor que fecha_inicio
      const fechaInicio = new Date(fechaInicioStr);
      const fechaFin = new Date(value);

      if (fechaFin <= fechaInicio){
        return "La fecha de fin debe ser posterior a la fecha de inicio.";
      }

      const unAnioDespues = new Date(fechaInicio);
      unAnioDespues.setFullYear(unAnioDespues.getFullYear() + 1);

      if (fechaFin > unAnioDespues) {
        return "El periodo no puede exceder los 12 meses desde la fecha de inicio.";
      }

      return null;
    }
   },
};

export default ({ id, visible, setVisible, reload, actividadesPrevias }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [actividadesRegistradas, setActividadesRegistradas] = useState(actividadesPrevias || []);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarActividad = async () => {
    const actividadError = formErrors.actividad;
    if (actividadError) {
      pushNotification(actividadError,"warning", notifications.length + 1);
      return;
    }

    // Validación: Verificar si el nombre de la nueva actividad ya existe en las actividades previas
    const actividadNombre = formValues.actividad.trim();
    const actividadExistente = actividadesRegistradas.some(
      (actividad) => actividad.actividad === actividadNombre // Asegúrate de que el nombre de la actividad se compara correctamente
    );

    if (actividadExistente) {
      pushNotification(
        "Esta actividad ya esta registrada.",
        "warning",
        notifications.length + 1
      );
      return; // Detener el proceso si el nombre ya existe
    }


    if (validateForm()) {
      const fechaInicio = new Date(formValues.fecha_inicio);
      const fechaFin = new Date(formValues.fecha_fin);
      if (fechaFin <= fechaInicio){
        pushNotification (
          "La fecha de fin debe ser posterior a la fecha de inicio.",
          "Warning",
          notifications.length + 1 
        );
        return; //Detener la acción si la validación falla
      }

      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/pro-ctie/agregarActividad",
        { ...formValues, proyecto_id: id }
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
      setActividadesRegistradas([
      ...actividadesRegistradas,
      { actividad: formValues.actividad, fecha_inicio: formValues.fecha_inicio, fecha_fin: formValues.fecha_fin }
    ]);
    }
  };

const isDateEnabled = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  // Solo bloquear días anteriores a hoy
  return selectedDate >= today;
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
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Actividad" stretch errorText={formErrors.actividad}>
            <Input
              placeholder="Escriba el nombre de la actividad"
              value={formValues.actividad}
              onChange={({ detail }) => handleChange("actividad", detail.value)}
            />
            {/* Mostrar el mensaje de error debajo del input si existe */}
            {formErrors.actividad && formErrors.actividad.includes("faltan") && (
              <Box color="danger" marginTop="xs">
                {formErrors.actividad}
              </Box>
            )}
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
                onChange={({ detail }) => {
                //console.log("Fecha seleccionada para inicio:", detail.value);
                handleChange("fecha_inicio", detail.value)}
                } 
                isDateEnabled={(date) => isDateEnabled(date, false)}
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
                onChange={({ detail }) => handleChange("fecha_fin", detail.value)}
                disabled={!formValues.fecha_inicio}
                isDateEnabled={(date) => isDateEnabled(date, true)} //=> {
                //  if (!formValues.fecha_inicio) return false;

                //  const start = new Date(formValues.fecha_inicio);
                //  const min = new Date(start);
                //  const max = new Date(start);
                //  min.setDate(min.getDate() + 1);
                //  max.setFullYear(max.getFullYear() + 1);

                //  date.setHours(0, 0, 0, 0);
                //  return date >= min && date <= max;
                // 
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
