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
  deuda_academica: { label: "Sin deuda", value: "Sin deuda" },
  deuda_economica: { label: "Sin deuda", value: "Sin deuda" },
  fecha_deuda: "",
  detalle_deuda: "",
  comentario_deuda: "",
};

const formRules = {
  deuda_academica: { required: false },
  deuda_economica: { required: false },
  fecha_deuda: { required: false },
  detalle_deuda: { required: false },
  comentario_deuda: { required: false },
};

export default ({ close, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const sendDeuda = async () => {
    if (validateForm()) {
      setCreating(true);
      const response = await axiosBase.post(
        "admin/estudios/deudaProyecto/editarDetalleDeuda",
        {
          proyecto_id: item.id,
          proyecto_id_real: item.proyecto_id,
          proyecto_origen: item.proyecto_origen,
          tipo_proyecto: item.tipo_proyecto,
          deuda_academica: formValues.deuda_academica,
          deuda_economica: formValues.deuda_economica,
          fecha_deuda: formValues.fecha_deuda,
          detalle_deuda: formValues.detalle_deuda,
          comentario_deuda: formValues.comentario_deuda,
        }
      );
      const res = response.data;
      pushNotification(res.detail, res.message, notifications.length + 1);
      setCreating(false);
      reload();
      close();
    }
  };

  const getDeudaActual = async () => {
    setLoading(true);

    const res = await axiosBase.get(
      "admin/estudios/deudaProyecto/proyectoDeuda",
      {
        params: {
          proyecto_id: item.proyecto_id,
          proyecto_origen: item.proyecto_origen,
          tipo_proyecto: item.tipo_proyecto,
        },
      }
    );

    const deuda = res.data.deuda;

    if (deuda) {
      handleChange("detalle_deuda", deuda.informe || "");
      handleChange("comentario_deuda", deuda.detalle || "");
      handleChange("fecha_deuda", deuda.fecha_deuda || "");

      const deudaAcademica = res.data.deuda_academica || "Sin deuda";
      const deudaEconomica = res.data.deuda_economica || "Sin deuda";

      handleChange("deuda_academica", {
        label: deudaAcademica,
        value: deudaAcademica,
      });

      handleChange("deuda_economica", {
        label: deudaEconomica,
        value: deudaEconomica,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getDeudaActual();
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
              Editar deuda
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar deuda"
    >
      <SpaceBetween direction="vertical" size="l">
        <FormField
          label="Deuda académica"
          errorText={formErrors.deuda_academica}
        >
          <Select
            placeholder="Escoge una opción"
            options={[
              { label: "Deuda Académica", value: "Deuda Académica" }, 
              { label: "Sin deuda", value: "Sin deuda" }
            ]}
            selectedOption={formValues.deuda_academica}
            onChange={({ detail }) =>
              handleChange("deuda_academica", detail.selectedOption)
            }
          />
        </FormField>
        <FormField
          label="Deuda económica"
          errorText={formErrors.deuda_economica}
        >
          <Select
            placeholder="Escoge una opción"
            options={[
              { label: "Deuda Económica", value: "Deuda Económica" }, 
              { label: "Sin deuda", value: "Sin deuda" },
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
