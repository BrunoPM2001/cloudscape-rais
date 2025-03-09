import {
  Modal,
  Box,
  SpaceBetween,
  Form,
  Button,
  FormField,
  Input,
  Select,
  Alert,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

export default ({ id, close, reload, options, limit }) => {
  //  Const
  const initialForm = {
    tipo: null,
    partida: null,
    monto: "",
  };

  const formRules = {
    tipo: { required: true },
    partida: { required: true },
    monto: { required: true, lessThan: Number(limit) },
  };

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarPartida = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/eci/agregarPartida",
        {
          ...formValues,
          id,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
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
              onClick={agregarPartida}
              loading={loadingCreate}
            >
              Incluir partida
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar partida al proyecto"
    >
      <Form>
        <SpaceBetween size="s">
          <Alert header={`Saldo disponible: S/. ${limit}`} />
          <FormField
            label="Tipo de partida"
            stretch
            errorText={formErrors.tipo}
          >
            <Select
              placeholder="Escoja una opción"
              options={[
                {
                  value: "Bienes",
                },
                {
                  value: "Servicios",
                },
              ]}
              selectedOption={formValues.tipo}
              onChange={({ detail }) =>
                handleChange("tipo", detail.selectedOption)
              }
            />
          </FormField>
          <FormField label="Partida" stretch errorText={formErrors.partida}>
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
          <FormField label="Monto" stretch errorText={formErrors.monto}>
            <Input
              type="number"
              placeholder="Escriba el monto"
              value={formValues.monto}
              onChange={({ detail }) => handleChange("monto", detail.value)}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
