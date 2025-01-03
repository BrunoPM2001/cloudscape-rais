import {
  Box,
  Button,
  DatePicker,
  FormField,
  Modal,
  SpaceBetween,
  Textarea,
  Select,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  deuda_academica: "",
  deuda_economica: "",
  fecha_deuda: "",
  detalle_deuda: "",
  comentario_deuda: "",
};

const formRules = {
  deuda_academica: { required: true },
  deuda_economica: { required: true },
  fecha_deuda: { required: true },
  detalle_deuda: { required: true },
  comentario_deuda: { required: false },
};

export default ({ close, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [optDeudaAcademica, setOptDeudaAcademica] = useState([]);
  const [creating, setCreating] = useState(false);
  //  Hooks

  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const getDeudaAcademica = async () => {
    const res = await axiosBase.get(
      "admin/estudios/deudaProyecto/listadoDeudaAcademica",
      {
        params: {
          tipo_proyecto: item[0].tipo_proyecto,
        },
      }
    );

    // Accede a 'opciones' desde 'res.data'
    const opciones = res.data.opciones;

    // Mapea el array asociativo en un formato adecuado
    const opcionesDeuda = Object.entries(opciones).map(([key, value]) => ({
      value: key, // Clave del objeto
      label: value, // Valor del objeto
    }));

    // Actualiza el estado con las opciones formateadas
    setOptDeudaAcademica(opcionesDeuda);
    setLoading(false);
  };

  const sendDeuda = async () => {
    if (validateForm()) {
      setCreating(true);
      const response = await axiosBase.post(
        "admin/estudios/deudaProyecto/asignarDeuda",
        {
          ...formValues,
          proyecto_id: item[0].proyecto_id,
          proyecto_origen: item[0].proyecto_origen,
          tipo_proyecto: item[0].tipo_proyecto,
        }
      );
      const res = response.data;
      pushNotification(res.detail, res.message, notifications.length + 1);
      setCreating(false);
      reload();
      close();
    }
  };

  useEffect(() => {
    getDeudaAcademica();
  }, []);

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={creating}
              disabled={loading}
              onClick={() => sendDeuda()}
            >
              Agregar deuda
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Asignar Deuda"
    >
      <SpaceBetween direction="vertical" size="l">
        <FormField
          label="Deuda académica"
          errorText={formErrors.deuda_academica}
        >
          <Select
            placeholder="-- Seleccione una opcion --"
            options={optDeudaAcademica} // Usar las opciones de la deuda académica
            selectedOption={formValues.deuda_academica}
            onChange={({ detail }) =>
              handleChange("deuda_academica", detail.selectedOption)
            }
            statusType={loading ? "loading" : "finished"}
            loadingText="Cargando data"
          />
        </FormField>
        <FormField
          label="Deuda económica"
          errorText={formErrors.deuda_economica}
        >
          <Select
            placeholder="-- Seleccione una opcion --"
            options={[
              { label: "Deuda económica", value: 2 },
              { label: "Sin deuda", value: 0 },
            ]}
            selectedOption={formValues.deuda_economica}
            onChange={({ detail }) =>
              handleChange("deuda_economica", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Fecha de la deuda" errorText={formErrors.fecha_deuda}>
          <DatePicker
            placeholder="YYYY/MM/DD"
            value={formValues.fecha_deuda}
            onChange={({ detail }) => handleChange("fecha_deuda", detail.value)}
          />
        </FormField>
        <FormField
          label="Detalle de la deuda"
          stretch
          errorText={formErrors.detalle_deuda}
        >
          <Textarea
            value={formValues.detalle_deuda}
            onChange={({ detail }) =>
              handleChange("detalle_deuda", detail.value)
            }
          />
        </FormField>
        <FormField
          label="Comentarios del proyecto"
          stretch
          errorText={formErrors.comentario_deuda}
        >
          <Textarea
            value={formValues.comentario_deuda}
            onChange={({ detail }) =>
              handleChange("comentario_deuda", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
