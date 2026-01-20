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

const UTILES_LIMPIEZA_IDS = [6, 7];
const LIMITE_UTILES_LIMPIEZA = 800;

export default ({ close, reload, item, options, limit, presupuesto }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);
  const [alertMessage, setAlertMessage] = useState("");
  //  States
  const [loading, setLoading] = useState(false);
  const limits = {
    /**Pasajes y viaticos */
    38: 8000,
    39: 8000,

    /**Servicios de terceros */
    43: 15000,
    41: 15000,
    46: 15000,
    47: 15000,
    45: 15000,
    49: 15000,

    /**Asesoria Especializada */

    /**Servicios Diversos */

    /**Movilidad local */
    40: 800,

    /* Materiales e insumos */
    4: 32000,
    5: 32000,
    9: 32000,
    16: 32000,
    22: 32000,
    14: 32000,
    23: 32000,

    /**Utiles y materiales de oficina */
    6: 800,
    7: 800,

    /**Equipos y bienes duraderos */
    26: 32000,
    27: 32000,
    28: 32000,
    29: 32000,
    76: 32000,
    35: 32000,
    37: 32000,
  };
  const isDisabled = () => {
    const limit = getLimiteReal();
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
      66: 6000,
      67: 6000,
      /**Servicios de terceros */
      70: 10000,
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
      40: 800,

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
    const limit = getLimiteReal();

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

  const getUtilesLimpiezaUsado = () => {
    if (!presupuesto) return 0;

    return presupuesto
      .filter(
        p =>
          UTILES_LIMPIEZA_IDS.includes(p.partida_id) &&
          p.id !== item.id // excluir la que se está editando
      )
      .reduce((sum, p) => sum + Number(p.monto), 0);
  };

  const getLimiteReal = () => {
    const partidaId = formValues.partida?.value;

    if (!UTILES_LIMPIEZA_IDS.includes(partidaId)) {
      return limits[partidaId];
    }

    const usado = getUtilesLimpiezaUsado();
    return LIMITE_UTILES_LIMPIEZA - usado;
  };


  // Trigger custom validation when values change
  const handleCustomChange = (field, value) => {
    handleChange(field, value);
    // Valida reglas después de actualizar el valor
    setTimeout(validateRules, 0); // Asegura que los valores actualizados se usen
  };

  const initialForm = {
    tipo: { value: item.tipo },
    partida: {
      value: item.partida_id,
      label: item.codigo + " - " + item.partida,
    },
    monto: item.monto,
    justificacion: item.justificacion,
  };

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
  const actualizar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "investigador/convocatorias/pconfigi/actualizarPartida",
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
            <Button
              variant="primary"
              loading={loading}
              onClick={actualizar}
              disabled={isDisabled()}
            >
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
        {alertMessage && (
          <Alert type="error" header="Supero el monto permitido:">
            {alertMessage}
          </Alert>
        )}
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
            selectedOption={formValues.partida}
            onChange={({ detail }) =>
              handleChange("partida", detail.selectedOption)
            }
          />
          {UTILES_LIMPIEZA_IDS.includes(formValues.partida?.value) && (
          <Box fontSize="body-s" color="text-status-info">
            Disponible: S/{" "}
            {Math.max(0, getLimiteReal()).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
            })}{" "}
            (compartido entre Útiles y Limpieza)
          </Box>
        )}
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
              handleChange("justificacion", detail.value)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
