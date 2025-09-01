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

  const isDateEnabled = (date, isFechaFin = false) => {
    //console.log("Actividades previas:", actividadesRegistradas);

    // Convierte la fecha seleccionada a un formato comparable (sin hora)
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Establecer la hora a medianoche para una comparación precisa
    //console.log("Fecha seleccionada después de normalizar:", selectedDate);

    // No permitir fechas anteriores al día actual
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche
    //console.log("Fecha actual:", today);

    if (selectedDate < today) {
      //console.log("Fecha seleccionada es anterior al día actual:", selectedDate);
      return false; // Bloquear fechas anteriores al día actual
    }

    // Deshabilitar las fechas que caen dentro de los rangos de actividades previas
    for (const actividad of actividadesRegistradas) {
      const fechaInicio = new Date(actividad.fecha_inicio);
      const fechaFin = new Date(actividad.fecha_fin);

      // Normalizamos las fechas de actividades previas a medianoche para asegurar una comparación correcta
      fechaInicio.setHours(0, 0, 0, 0);
      fechaFin.setHours(0, 0, 0, 0);

      //console.log("Fecha inicio actividad (normalizada):", fechaInicio);
      //console.log("Fecha fin actividad (normalizada):", fechaFin);

      // Verifica si la fecha seleccionada está dentro del rango de la actividad (inicio y fin)
      if (selectedDate >= fechaInicio && selectedDate <= fechaFin) {
        //console.log("Fecha dentro de rango bloqueado (inicio y fin):", selectedDate);
        return false; // La fecha está dentro de un rango bloqueado
      }

      // Verificar si la fecha seleccionada coincide exactamente con el inicio o fin de la actividad
      if (selectedDate.getTime() === fechaInicio.getTime()) {
        //console.log("Fecha coincide con inicio de actividad:", selectedDate);
        return false; // La fecha seleccionada es igual a la fecha de inicio de la actividad previa
      }

      if (selectedDate.getTime() === fechaFin.getTime()) {
        //console.log("Fecha coincide con fin de actividad:", selectedDate);
        return false; // La fecha seleccionada es igual a la fecha de fin de la actividad previa
      }

      // Bloquear el día siguiente a la fecha de fin de la actividad
      const siguienteDia = new Date(fechaFin);
      siguienteDia.setDate(siguienteDia.getDate() + 1); // Sumar un día a la fecha de fin de la actividad

      //console.log("Día siguiente a la actividad (bloqueado):", siguienteDia);

      if (selectedDate.getTime() === siguienteDia.getTime()) {
        //console.log("Fecha coincide con el día siguiente a la actividad:", selectedDate);
        return false; // Bloquear el día siguiente a la actividad previa
      }
    }

    // Si estamos validando la fecha de inicio (isFechaFin es false), se verifica que esté después de la fecha de inicio
    if (!isFechaFin && !formValues.fecha_inicio) {
      //console.log("No hay fecha de inicio seleccionada. Bloqueando fecha.");
      return true; // Permitimos cualquier fecha hasta que la fecha de inicio sea seleccionada
    }

    if (!isFechaFin) {
      // Verificar que haya una fecha de inicio seleccionada antes de proceder
      const start = new Date(formValues.fecha_inicio); // Fecha de inicio seleccionada
      const min = new Date(start); // Día siguiente a la fecha de inicio
      min.setDate(min.getDate() + 1); // Fecha de inicio + 1 día

      //console.log("Rango de inicio permitido:", min);

      selectedDate.setHours(0, 0, 0, 0); // Aseguramos que la hora esté en 00:00:00 para una comparación precisa

      // Bloqueamos si la fecha seleccionada es igual a la de inicio o anterior a la fecha de inicio + 1 día
      if (selectedDate.getTime() <= min.getTime()) {
        //console.log("La fecha de fin debe ser posterior a la fecha de inicio.");
        return false; // Bloquear la fecha de fin si es igual o anterior a la fecha de inicio + 1 día
      }

      return selectedDate >= min; // Verifica que la fecha seleccionada sea mayor que la fecha de inicio seleccionada + 1 día
    }

    return true;
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
