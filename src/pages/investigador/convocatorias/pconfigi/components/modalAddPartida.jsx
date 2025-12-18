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
    38: 8000,
    39: 8000,
    62: 8000,
    63: 8000,
    66: 8000,
    67: 8000,
    /**Servicios de terceros */
    70: 10000,
    71: 10000,
    43: 10000,
    41: 10000,
    44: 10000,
    57: 10000,
    46: 10000,
    47: 10000,
    48: 10000,
    45: 10000,
    49: 10000,
    52: 10000,
    /**Asesoria Especializada */
    78: 5000,
    50: 5000,
    74: 5000,
    55: 5000,
    56: 5000,
    79: 5000,

    /**Servicios Diversos */
    49: 10000,
    73: 10000,

    /**Movilidad local */
    40: 5000,
    53: 5000,

    /* Materiales e insumos */

    4: 41000,
    5: 41000,
    9: 41000,
    16: 41000,
    22: 41000,
    13: 41000,
    14: 41000,
    23: 41000,

    /**Utiles y materiales de oficina */
    6: 1000,
    7: 1000,

    /**Equipos y bienes duraderos */
    26: 41000,
    27: 41000,
    25: 41000,
    28: 41000,
    29: 41000,
    76: 41000,
    35: 41000,
    37: 41000,
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
      38: 8000,
      39: 8000,
      62: 8000,
      63: 8000,
      66: 8000,
      67: 8000,
      /**Servicios de terceros */
      70: 10000,
      71: 10000,
      43: 10000,
      41: 10000,
      44: 10000,
      57: 10000,
      46: 10000,
      47: 10000,
      48: 10000,
      45: 10000,
      49: 10000,
      52: 10000,
      /**Asesoria Especializada */
      78: 5000,
      50: 5000,
      74: 5000,
      55: 5000,
      56: 5000,
      79: 5000,

      /**Servicios Diversos */
      49: 10000,
      73: 10000,

      /**Movilidad local */
      40: 5000,
      53: 5000,

      /* Materiales e insumos */

      4: 41000,
      5: 41000,
      9: 41000,
      16: 41000,
      22: 41000,
      13: 41000,
      14: 41000,
      23: 41000,

      /**Utiles y materiales de oficina */
      6: 1000,
      7: 1000,

      /**Equipos y bienes duraderos */
      26: 41000,
      27: 41000,
      25: 41000,
      28: 41000,
      29: 41000,
      76: 41000,
      35: 41000,
      37: 41000,
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
