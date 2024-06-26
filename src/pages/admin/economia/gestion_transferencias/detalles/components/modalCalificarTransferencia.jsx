import {
  Box,
  Button,
  FormField,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useState, useEffect } from "react";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

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

export default ({ visible, setVisible, id }) => {
  //  States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get(
      "admin/economia/transferencias/movimientosTransferencia",
      {
        params: {
          geco_operacion_id: id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
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
              loading={loading}
              onClick={() => editUser()}
            >
              Enviar resolución
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
