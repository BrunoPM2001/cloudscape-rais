import {
  Box,
  Button,
  Container,
  FormField,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

export default ({ close, reload, id, current, nombres }) => {
  //  Constantes
  const initialForm = {
    cargo: {
      value: current ?? "",
      label: current == null ? "Sin cargo" : current,
    },
  };

  const formRules = {
    cargo: { required: true },
  };
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const cambiarCargo = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/grupos/cambiarCargo", {
        ...formValues,
        grupo_integrante_id: id,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      setLoading(false);
      close();
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={cambiarCargo}>
              Cambiar cargo
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Actualizar cargo del miembro"
    >
      <SpaceBetween size="m">
        <Container>
          <Box variant="awsui-key-label">Nombres:</Box>
          <div>{nombres}</div>
        </Container>
        <FormField label="Cargo" stretch errorText={formErrors.cargo}>
          <Select
            placeholder="Escoja una opción"
            options={[
              { value: "Coordinador", label: "Coordinador" },
              { value: "", label: "Sin cargo" },
            ]}
            selectedOption={formValues.cargo}
            onChange={({ detail }) =>
              handleChange("cargo", detail.selectedOption)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
