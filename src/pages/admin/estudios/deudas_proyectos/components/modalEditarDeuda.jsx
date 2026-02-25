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
  deuda_academica: { required: false },
  deuda_economica: { required: false },
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

  const bloquearTipoDeuda = item.deuda === "SUBSANADA";

  const getDeudaAcademica = async () => {
    const res = await axiosBase.get(
      "admin/estudios/deudaProyecto/listadoDeudaAcademica",
      {
        params: {
          tipo_proyecto: item.tipo_proyecto,
        },
      }
    );
    const opciones = res.data;
    setOptDeudaAcademica([...opciones.map(op => 
        ({label: op.value, value: op.value})),
         {label: "Sin deuda", value: "Sin deuda" }]);
    setLoading(false);
  };

  const sendDeuda = async () => {
    if (validateForm()) {
      setCreating(true);
      const response = await axiosBase.post(
        "admin/estudios/deudaProyecto/asignarDeuda",
        {
          ...formValues,
          proyecto_id: item.id,
          tipo_proyecto: item.tipo_proyecto,
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

        // Selecciones
        if (res.data.deuda_academica !== "Sin deuda") {
        handleChange("deuda_academica", {
            label: res.data.deuda_academica,
            value: res.data.deuda_academica,
        });
        }

        if (res.data.deuda_economica !== "Sin deuda") {
        handleChange("deuda_economica", {
            label: res.data.deuda_economica,
            value: res.data.deuda_economica,
        });
        }
    }
    };

  useEffect(() => {
    getDeudaAcademica();
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
            disabled={bloquearTipoDeuda}
            placeholder="Escoge una opción"
            options={optDeudaAcademica}
            selectedOption={formValues.deuda_academica}
            onChange={({ detail }) =>
              handleChange("deuda_academica", detail.selectedOption)
            }
            statusType={loading ? "loading" : "finished"}
            loadingText="Cargando data"
            empty="No hay opciones disponibles"
          />
        </FormField>
        <FormField
          label="Deuda económica"
          errorText={formErrors.deuda_economica}
        >
          <Select
            disabled={bloquearTipoDeuda}
            placeholder="Escoge una opción"
            options={[
                { label: "Deuda económica", value: "Deuda económica" }, 
                { label: "Sin deuda", value: "Sin deuda" }]}
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
