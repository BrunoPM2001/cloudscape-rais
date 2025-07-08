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
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

export default ({ id, visible, setVisible, reload, limit }) => {
  //  Const
  const initialForm = {
    tipo: null,
    partida: null,
    monto: "",
  };

  const formRules = {
    tipo: { required: true },
    partida: { required: true },
    monto: { required: true, lessThan: limit },
  };

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [optPartidas, setOptPartidas] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const listarTiposPartidas = async (value) => {
    setOptPartidas([]);
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listarTiposPartidas",
      {
        params: {
          tipo: value,
        },
      }
    );
    const data = res.data;
    setOptPartidas(data);
  };

  const agregarPartida = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/pro-ctie/agregarPartida",
        {
          partida_id: formValues.partida.value,
          proyecto_id: id,
          monto: formValues.monto,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
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
              onChange={({ detail }) => {
                handleChange("tipo", detail.selectedOption);
                listarTiposPartidas(detail.selectedOption.value);
              }}
            />
          </FormField>
          <FormField label="Partida" stretch errorText={formErrors.partida}>
            <Select
              placeholder="Escoja una opción"
              statusType={optPartidas.length == 0 ? "loading" : "finished"}
              options={optPartidas}
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
