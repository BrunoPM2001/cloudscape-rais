import {
  Box,
  Button,
  FormField,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";

const opt_estado = [
  { value: 0, label: "No activo" },
  { value: 1, label: "Activo" },
];

const initialForm = {
  nombre: "",
  estado: null,
};

const formRules = {
  nombre: { required: true },
  estado: { required: true },
};

export default ({ item, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const update = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/estudios/revistas/updateDBwos",
        formValues
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      close();
      reload();
    }
  };

  const getData = async () => {
    handleChange("id", item.id);
    handleChange("nombre", item.nombre);
    handleChange(
      "estado",
      opt_estado.find((opt) => opt.label == item.estado)
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Editar base de datos"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={update}>
              Actualizar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField label="Nombre" errorText={formErrors.nombre} stretch>
          <Input
            value={formValues.nombre}
            onChange={({ detail }) => handleChange("nombre", detail.value)}
          />
        </FormField>
        <FormField label="Estado" errorText={formErrors.estado} stretch>
          <Select
            placeholder="Escoja una opción"
            selectedOption={formValues.estado}
            onChange={({ detail }) =>
              handleChange("estado", detail.selectedOption)
            }
            options={opt_estado}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
