import {
  Box,
  Button,
  FormField,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState, useEffect, useContext } from "react";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";

const optEstado = [
  {
    value: 1,
    label: "Aprobado",
  },
  {
    value: 2,
    label: "Rechazado",
  },
];

const optAutoridad = [
  { value: "RAMIREZ ROCA PABLO SERGIO" },
  { value: "ROJAS AYALA CHACHI" },
  { value: "GARCÍA RIVERA VICTOR ANTHONY" },
  { value: "SILVA ROBLEDO DE RICALDE JOVITA" },
];

const initialForm = {
  estado: null,
  autoridad: null,
  observacion: "",
};

const formRules = {
  estado: { required: true },
  autoridad: { required: true },
};

export default ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const calificar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.post(
        "admin/economia/transferencias/calificar",
        {
          geco_proyecto_id: id,
          autoridad: formValues.autoridad.value,
          observacion: formValues.observacion,
          estado: formValues.estado.value,
        }
      );
      setLoading(false);
      setVisible(false);
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
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
            <Button variant="primary" loading={loading} onClick={calificar}>
              Calificar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Calificar transferencia"
    >
      <SpaceBetween size="m">
        <FormField label="Estado" stretch errorText={formErrors.estado}>
          <Select
            placeholder="Escoja una opción"
            options={optEstado}
            selectedOption={formValues.estado}
            onChange={({ detail }) =>
              handleChange("estado", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Autoridad" stretch errorText={formErrors.autoridad}>
          <Select
            placeholder="Escoja una opción"
            options={optAutoridad}
            selectedOption={formValues.autoridad}
            onChange={({ detail }) =>
              handleChange("autoridad", detail.selectedOption)
            }
          />
        </FormField>
        <FormField
          label="Observación"
          stretch
          errorText={formErrors.observacion}
        >
          <Textarea
            placeholder="Detalle la observación en caso de rechazar la transferencia"
            rows={3}
            value={formValues.observacion}
            onChange={({ detail }) => handleChange("observacion", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
