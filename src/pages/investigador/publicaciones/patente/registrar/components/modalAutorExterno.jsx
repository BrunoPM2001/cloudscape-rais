import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Input,
  ColumnLayout,
  Select,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  autor: "",
  apellido1: "",
  apellido2: "",
  nombres: "",
  condicion: null,
};

const formRules = {
  condicion: { required: true },
  nombres: { required: true },
  apellido1: { required: true },
};

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post(
        "investigador/publicaciones/propiedadInt/addAutor",
        {
          ...formValues,
          tipo: "externo",
          id,
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarAutor}
              loading={loadingCreate}
            >
              Agregar autor
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar autor"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <ColumnLayout columns={3}>
            <FormField label="Nombres" errorText={formErrors.nombres} stretch>
              <Input
                value={formValues.nombres}
                onChange={({ detail }) => handleChange("nombres", detail.value)}
              />
            </FormField>
            <FormField
              label="Apellido paterno"
              errorText={formErrors.apellido1}
              stretch
            >
              <Input
                value={formValues.apellido1}
                onChange={({ detail }) =>
                  handleChange("apellido1", detail.value)
                }
              />
            </FormField>
            <FormField label="Apellido materno" stretch>
              <Input
                value={formValues.apellido2}
                onChange={({ detail }) =>
                  handleChange("apellido2", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField label="Condición" stretch errorText={formErrors.condicion}>
            <Select
              placeholder="Escoja una opción"
              selectedOption={formValues.condicion}
              onChange={({ detail }) => {
                handleChange("condicion", detail.selectedOption);
              }}
              options={[{ value: "Autor" }, { value: "Inventor" }]}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
