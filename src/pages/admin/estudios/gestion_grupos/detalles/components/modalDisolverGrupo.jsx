import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Modal,
  SpaceBetween,
  Textarea,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  motivo_disolucion: "",
};

const formRules = {
  motivo_disolucion: { required: true },
};

export default ({ close, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const disolverGrupo = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/estudios/grupos/disolverGrupo", {
        ...formValues,
        grupo_id,
      });
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      close();
      setTimeout(() => (window.location.href = "../grupos"), 2000);
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
            <Button variant="primary" loading={loading} onClick={disolverGrupo}>
              Disolver
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header description="Se cambiará el estado del grupo por lo que todos los miembros figurarán como libres">
          Disolver grupo
        </Header>
      }
    >
      <Form>
        <FormField
          label="Motivo"
          stretch
          errorText={formErrors.motivo_disolucion}
        >
          <Textarea
            placeholder="Detalle el motivo de la disolución"
            value={formValues.motivo_disolucion}
            onChange={({ detail }) =>
              handleChange("motivo_disolucion", detail.value)
            }
          />
        </FormField>
      </Form>
    </Modal>
  );
};
