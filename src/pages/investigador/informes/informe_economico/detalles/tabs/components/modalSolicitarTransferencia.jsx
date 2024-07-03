import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  FormField,
  Grid,
  Input,
  Modal,
  Select,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../../hooks/useFormValidation";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../../api/axios";
import NotificationContext from "../../../../../../../providers/notificationProvider";

const gridDefinition = [
  {
    colspan: {
      default: 12,
      l: 3,
      m: 3,
      s: 3,
      xs: 3,
    },
  },
  {
    colspan: {
      default: 12,
      l: 9,
      m: 9,
      s: 9,
      xs: 9,
    },
  },
  {
    colspan: {
      default: 12,
      l: 3,
      m: 3,
      s: 3,
      xs: 3,
    },
  },
  {
    colspan: {
      default: 12,
      l: 9,
      m: 9,
      s: 9,
      xs: 9,
    },
  },
];

const initialForm = {
  tipoA: null,
  partidaA: null,
  tipoB: null,
  partidaB: null,
  monto: "",
};

const formRules = {
  razon_social: { required: true },
  tipoA: { required: true },
  partidaA: { required: true },
  tipoB: { required: true },
  partidaB: { required: true },
  monto: { required: true },
};

export default ({ setVisible, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [optsA, setOptsA] = useState([]);
  const [optsB, setOptsB] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getListado = async () => {
    const res = await axiosBase.get(
      "investigador/informes/informe_economico/partidasTransferencias",
      {
        params: {
          geco_proyecto_id: id,
        },
      }
    );
    const data = res.data;
    setOptsA(data.partidasA);
    setOptsB(data.partidasB);
  };

  const agregar = async () => {
    if (validateForm()) {
      if (
        parseFloat(formValues.monto) <= parseFloat(formValues.partidaA?.max) &&
        formValues.partidaA.max > 0
      ) {
        const res = await axiosBase.post(
          "investigador/informes/informe_economico/addTransferenciaTemporal",
          {
            geco_proyecto_id: id,
            partidaB: formValues.partidaB.value,
            partidaA: formValues.partidaA.value,
            monto: formValues.monto,
          }
        );
        const data = res.data;
        setVisible(false);
        pushNotification(data.detail, data.message, notifications.length);
        reload();
      }
    }
  };

  useEffect(() => {
    getListado();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" iconName="add-plus" onClick={agregar}>
              Añadir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Nueva transferencia"
    >
      <SpaceBetween size="m">
        <Grid gridDefinition={gridDefinition}>
          <FormField label="Tipo" stretch errorText={formErrors.tipoA}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.tipoA}
              onChange={({ detail }) => {
                handleChange("tipoA", detail.selectedOption);
                handleChange("partidaA", null);
              }}
              options={[
                {
                  value: "Bienes",
                },
                {
                  value: "Servicios",
                },
                {
                  value: "Otros",
                },
              ]}
            />
          </FormField>
          <FormField label="Partida" stretch errorText={formErrors.partidaA}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.partidaA}
              onChange={({ detail }) =>
                handleChange("partidaA", detail.selectedOption)
              }
              options={
                optsA.filter(
                  (option) => formValues.tipoA?.value == option?.tipo
                ) ?? []
              }
              statusType={formValues.tipoA == null ? "loading" : "finished"}
              loadingText="Escoja un tipo"
              empty="No hay partidas de este tipo"
            />
          </FormField>
        </Grid>
        {formValues.partidaA != null && (
          <Alert
            header={
              formValues.partidaA.max > 0
                ? `Tiene S/. ${formValues.partidaA.max} de saldo disponible para esta transferencia`
                : "No cuenta con saldo disponible para esta transferencia"
            }
            type={formValues.partidaA.max > 0 ? "info" : "error"}
          >
            <ColumnLayout columns={4} variant="text-grid">
              <div>
                <Box variant="awsui-key-label">Presupuesto</Box>
                <div>S/. {formValues.partidaA.monto}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Monto enviado</Box>
                <div>S/. {formValues.partidaA.monto_rendido_enviado}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Monto aprobado</Box>
                <div>S/. {formValues.partidaA.monto_rendido}</div>
              </div>
              <div>
                <Box variant="awsui-key-label">Monto excedido</Box>
                <div>S/. 0</div>
              </div>
            </ColumnLayout>
          </Alert>
        )}
        <FormField
          label="Monto"
          stretch
          errorText={
            parseFloat(formValues.monto) > parseFloat(formValues.partidaA?.max)
              ? "Ha superado el monto máximo"
              : formErrors.monto
          }
        >
          <Input
            type="number"
            inputMode="decimal"
            placeholder="Escriba el monto"
            value={formValues.monto}
            onChange={({ detail }) => handleChange("monto", detail.value)}
          />
        </FormField>
        <Grid gridDefinition={gridDefinition}>
          <FormField label="Tipo" stretch errorText={formErrors.tipoB}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.tipoB}
              onChange={({ detail }) => {
                handleChange("tipoB", detail.selectedOption);
                handleChange("partidaB", null);
              }}
              options={[
                {
                  value: "Bienes",
                },
                {
                  value: "Servicios",
                },
                {
                  value: "Otros",
                },
              ]}
            />
          </FormField>
          <FormField label="Partida" stretch errorText={formErrors.partidaB}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.partidaB}
              onChange={({ detail }) =>
                handleChange("partidaB", detail.selectedOption)
              }
              options={
                optsB.filter(
                  (option) => formValues.tipoB?.value === option?.tipo
                ) ?? []
              }
              statusType={formValues.tipoB == null ? "loading" : "finished"}
              loadingText="Escoja un tipo"
              empty="No hay partidas de este tipo"
            />
          </FormField>
        </Grid>
      </SpaceBetween>
    </Modal>
  );
};
