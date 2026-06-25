import {
  Box,
  Button,
  FormField,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const initialForm = {
  periodo: null,
  tipo: null,
  partida: null,
};

const formRules = {
  periodo: { required: true },
  tipo: { required: true },
  partida: { required: true },
};

const opt_tipo = [
  { value: "Bienes" },
  { value: "Servicios" },
  { value: "Otros" },
];

const opt_periodo = [
  { value: "2026" },
  { value: "2025" },
  { value: "2024" },
  { value: "2023" },
];

export default ({ item, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [partidas, setPartidas] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const create = async () => {
    if (validateForm()) {
      setCreating(true);
      const res = await axiosBase.post(
        "admin/estudios/convocatorias/addPartida",
        {
          id: item.id,
          periodo: formValues.periodo.value,
          partida_id: formValues.partida.value,
        }
      );
      const data = res.data;
      setCreating(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
    }
  };

  const getData = async () => {
    const res = await axiosBase.get(
      "admin/estudios/convocatorias/dataCreatePartida",
      {
        params: {
          tipo_proyecto: item.tipo_proyecto,
        },
      }
    );
    const data = res.data;
    setPartidas(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={creating} onClick={create}>
              Agregar partida
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar criterio"
    >
      <SpaceBetween size="m">
        <FormField label="Periodo" errorText={formErrors.periodo} stretch>
          <Select
            placeholder="Escoja un periodo"
            selectedOption={formValues.periodo}
            onChange={({ detail }) => {
              handleChange("periodo", detail.selectedOption);
              handleChange("tipo", null);
              handleChange("partida", null);
            }}
            options={opt_periodo}
          />
        </FormField>
        <FormField label="Tipo" errorText={formErrors.tipo} stretch>
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.tipo}
            onChange={({ detail }) => {
              handleChange("tipo", detail.selectedOption);
              handleChange("partida", null);
            }}
            options={opt_tipo}
          />
        </FormField>
        <FormField label="Partida" errorText={formErrors.partida} stretch>
          <Select
            placeholder="Escoja una opción"
            options={
              loading
                ? []
                : partidas.filter(
                    (item) => 
                      Number(item.periodo) === Number(formValues?.periodo?.value) &&
                      item.tipo == formValues?.tipo?.value
                  )
            }
            selectedOption={formValues.partida}
            onChange={({ detail }) =>
              handleChange("partida", detail.selectedOption)
            }
            loadingText="Cargando datos"
            statusType={loading ? "loading" : "finished"}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
