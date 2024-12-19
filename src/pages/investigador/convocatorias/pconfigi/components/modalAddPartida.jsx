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
  // Define los límites para cada partida en un objeto
 
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
    6: 800,
    16: 32000,
    38: 3000,
    40: 800,
    49: 10000,
    69: 3000,
    73: 8000,
    79: 4000,
  };
  
  const isDisabled = () => {
    const limit = limits[formValues.partida?.value];
    return limit && formValues.monto > limit; // Desactiva si supera el límite
  };

  const validateRules = () => {
    // Define los límites para cada partida en un objeto
    const limits = {
      6: 800,
      16: 32000,
      38: 3000,
      40: 800,
      49: 10000,
      69: 3000,
      73: 8000,
      79: 4000,
    };
  
    // Verifica si el valor actual de partida tiene un límite definido
    const limit = limits[formValues.partida?.value];
  
    if (limit && formValues.monto > limit) {
      setAlertMessage(
        `No puedes asignar más de S/ ${limit.toLocaleString("es-PE")} a la partida ${formValues.partida?.label}`
      );
    } else {
      setAlertMessage(""); // Limpia el mensaje si no hay problemas
    }
  };

  // Trigger custom validation when values change
  const handleCustomChange = (field, value) => {
    handleChange(field, value);
   // Valida reglas después de actualizar el valor
  setTimeout(validateRules, 0); // Asegura que los valores actualizados se usen
  };
  // console.log(formValues);

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
            disabled={ isDisabled()}
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
            value={formValues.monto}
            onChange={({ detail }) => {
              const newValue = detail.value;
              if (newValue >= 0) {
                handleCustomChange("monto", newValue);
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
