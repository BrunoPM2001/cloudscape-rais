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

const initialForm = {
  tipo: null,
  partida: null,
  monto: "",
  justificacion: "",
};

export default ({ close, reload, id, options, limit }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);
  //  States
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const formRules = {
    tipo: { required: true },
    partida: { required: true },
    monto: { required: true, lessThan: Number(limit) },
    justificacion: { required: true },
  };

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/pconfigi/agregarPartida",
        { ...formValues, id }
      );
      const data = res.data;
      console.log(data);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
      setLoading(false);
    }
  };

  const limits = {
    /**Pasajes y viaticos */
    38: 6000,
    39: 6000,
    62: 6000,
    63: 6000,
    66: 6000,
    67: 6000,
    /**Servicios de terceros */
    70: 8000,
    71: 8000,
    43: 8000,
    41: 8000,
    44: 8000,
    57: 8000,
    46: 8000,
    47: 8000,
    48: 8000,
    45: 8000,
    49: 8000,
    52: 8000,
    /**Asesoria Especializada */
    78: 4000,
    50: 4000,
    74: 4000,
    55: 4000,
    56: 4000,
    79: 4000,

    /**Servicios Diversos */
    49: 10000,
    73: 10000,

    /**Movilidad local */
    40: 800,
    53: 800,

    /* Materiales e insumos */

    4: 32000,
    5: 32000,
    9: 32000,
    16: 32000,
    22: 32000,
    13: 32000,
    14: 32000,
    23: 32000,

    /**Utiles y materiales de oficina */
    6: 800,
    7: 800,

    /**Equipos y bienes duraderos */
    26: 32000,
    27: 32000,
    25: 32000,
    28: 32000,
    29: 32000,
    76: 32000,
    35: 32000,
    37: 32000,
  };

  const isDisabled = () => {
    const limit = limits[formValues.partida?.value];
    const monto = parseFloat(formValues.monto); // Asegúrate de que sea un número válido
    return (
      isNaN(monto) || // Desactiva si el monto no es un número válido
      monto <= 0 || // Desactiva si el monto es 0 o menor
      (limit && monto > limit) // Desactiva si el monto supera el límite
    );
  };

  const validateRules = () => {
    // Define los límites para cada partida en un objeto
    const limits = {
      /**Pasajes y viaticos */
      38: 6000,
      39: 6000,
      62: 6000,
      63: 6000,
      66: 6000,
      67: 6000,
      /**Servicios de terceros */
      70: 8000,
      71: 8000,
      43: 8000,
      41: 8000,
      44: 8000,
      57: 8000,
      46: 8000,
      47: 8000,
      48: 8000,
      45: 8000,
      49: 8000,
      52: 8000,
      /**Asesoria Especializada */
      78: 4000,
      50: 4000,
      74: 4000,
      55: 4000,
      56: 4000,
      79: 4000,

      /**Servicios Diversos */
      49: 10000,
      73: 10000,

      /**Movilidad local */
      40: 800,
      53: 800,

      /* Materiales e insumos */

      4: 32000,
      5: 32000,
      9: 32000,
      16: 32000,
      22: 32000,
      13: 32000,
      14: 32000,
      23: 32000,

      /**Utiles y materiales de oficina */
      6: 800,
      7: 800,

      /**Equipos y bienes duraderos */
      26: 32000,
      27: 32000,
      25: 32000,
      28: 32000,
      29: 32000,
      76: 32000,
      35: 32000,
      37: 32000,
    };

    // Verifica si el valor actual de partida tiene un límite definido
    const limit = limits[formValues.partida?.value] || 0;

    if (limit && formValues.monto > limit) {
      setAlertMessage(
        `No puedes asignar más de S/ ${limit.toLocaleString(
          "es-PE"
        )} a la partida ${formValues.partida?.label}`
      );
    } else {
      setAlertMessage(""); // Limpia el mensaje si no hay problemas
    }
  };

  const handleCustomChange = (field, value) => {
    handleChange(field, value);
    // Valida reglas después de actualizar el valor
    setTimeout(validateRules, 0); // Asegura que los valores actualizados se usen
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Agregar partida"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={agregar}
              disabled={isDisabled()}
            >
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="s">
        <Alert
          header={`Tiene disponible S/ ${limit} para asignar a esta partida`}
        />
        {alertMessage && (
          <Alert type="error" header="Supero el monto permitido:">
            {alertMessage}
          </Alert>
        )}
        {/* tipo */}
        <FormField label="Tipo" errorText={formErrors.tipo} stretch>
          <Select
            placeholder="Escoja una opción"
            options={[{ value: "Bienes" }, { value: "Servicios" }]}
            selectedOption={formValues.tipo}
            onChange={({ detail }) =>
              handleCustomChange("tipo", detail.selectedOption)
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
            selectedOption={formValues.partida}
            onChange={({ detail }) =>
              handleCustomChange("partida", detail.selectedOption)
            }
          />
        </FormField>
        <FormField label="Monto" errorText={formErrors.monto} stretch>
          <Input
            type="number"
            min={0}
            // max={limit}
            value={formValues.monto}
            onChange={({ detail }) => {
              const newValue = detail.value;
              // Permitir números con hasta dos decimales o vacío
              if (newValue === "" || /^[0-9]+(\.[0-9]{0,2})?$/.test(newValue)) {
                // Validar contra el límite solo si el valor no está vacío
                if (newValue === "" || parseFloat(newValue) <= limit) {
                  handleCustomChange("monto", newValue);
                }
              }
            }}
          />
        </FormField>
        <FormField
          label="Justificación"
          errorText={formErrors.justificacion}
          stretch
        >
          <Textarea
            value={formValues.justificacion}
            onChange={({ detail }) =>
              handleCustomChange("justificacion", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
