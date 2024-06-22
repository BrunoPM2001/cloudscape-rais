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

export default ({ visible, setVisible, reload, id, current, nombres }) => {
  //  Constantes
  const initialForm = {
    condicion: { value: current },
  };

  const formRules = {
    condicion: { required: true },
  };
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const cambiarCondicion = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/estudios/grupos/cambiarCondicion",
        {
          ...formValues,
          grupo_integrante_id: id,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      setLoading(false);
      setVisible(false);
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
              loading={loading}
              onClick={cambiarCondicion}
            >
              Cambiar condición
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Actualizar condición del miembro"
    >
      <SpaceBetween size="m">
        <Container>
          <Box variant="awsui-key-label">Nombres:</Box>
          <div>{nombres}</div>
        </Container>
        <FormField label="Condición" stretch errorText={formErrors.condicion}>
          <Select
            placeholder="Escoja una opción"
            options={[
              { value: "Titular" },
              { value: "Colaborador" },
              { value: "Colaborador Externo" },
              { value: "Adherente" },
            ]}
            selectedOption={formValues.condicion}
            onChange={({ detail }) =>
              handleChange("condicion", detail.selectedOption)
            }
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
