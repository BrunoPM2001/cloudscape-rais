import {
  Alert,
  Box,
  Button,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ close, reload, item, options, limit }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);
  //  States
  const [loading, setLoading] = useState(false);

  const initialForm = {
    tipo: { value: item.tipo },
    partida: {
      value: item.partida_id,
      label: item.codigo + " - " + item.partida,
    },
    monto: item.monto,
  };

  const formRules = {
    tipo: { required: true },
    partida: { required: true },
    monto: { required: true, lessThan: Number(limit) },
  };

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const actualizar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "investigador/convocatorias/eci/actualizarPartida",
        { ...formValues, id: item.id }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
      setLoading(false);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Actualizar partida"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={actualizar}>
              Actualizar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <Alert
          header={`Tiene disponible S/ ${limit} para asignar a esta partida`}
        />
        <FormField label="Tipo" errorText={formErrors.tipo} stretch>
          <Select
            placeholder="Escoja una opción"
            options={[{ value: "Bienes" }, { value: "Servicios" }]}
            selectedOption={formValues.tipo}
            onChange={({ detail }) =>
              handleChange("tipo", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Partida" errorText={formErrors.partida} stretch>
          <Select
            placeholder="Escoja una opción"
            disabled={!formValues.tipo}
            options={options.filter(
              (item) => item.tipo == formValues.tipo?.value
            )}
            empty="No hay partidas disponibles"
            selectedOption={formValues.partida}
            onChange={({ detail }) =>
              handleChange("partida", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Monto" errorText={formErrors.monto} stretch>
          <Input
            type="number"
            value={formValues.monto}
            onChange={({ detail }) => handleChange("monto", detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
