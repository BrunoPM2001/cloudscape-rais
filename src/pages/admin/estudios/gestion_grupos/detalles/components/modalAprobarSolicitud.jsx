import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Modal,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../providers/notificationProvider";
import axiosBase from "../../../../../../api/axios";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  grupo_categoria: null,
};

const formRules = {
  grupo_categoria: { required: true },
};

export default ({ visible, setVisible, grupo_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const aprobarSolicitud = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put(
        "admin/estudios/grupos/aprobarSolicitud",
        {
          ...formValues,
          grupo_id,
        }
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setLoading(false);
      setVisible(false);
      setTimeout(() => (window.location.href = "../grupos"), 5000);
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
              onClick={aprobarSolicitud}
            >
              Aprobar solicitud
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header description="Se registrará a la solicitud como grupo de investigación en el RAIS">
          Aprobar solicitud de creación
        </Header>
      }
    >
      <Form>
        <FormField
          label="Categoría del grupo"
          stretch
          errorText={formErrors.grupo_categoria}
        >
          <Select
            placeholder="Escoja una opción"
            options={[
              { value: "A" },
              { value: "B" },
              { value: "C" },
              { value: "D" },
            ]}
            selectedOption={formValues.grupo_categoria}
            onChange={({ detail }) =>
              handleChange("grupo_categoria", detail.selectedOption)
            }
          />
        </FormField>
      </Form>
    </Modal>
  );
};
