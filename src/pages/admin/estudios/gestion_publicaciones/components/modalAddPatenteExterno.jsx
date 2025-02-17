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
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  nombres: "",
  apellido1: "",
  apellido2: "",
  condicion: null,
};

const formRules = {
  nombres: { required: true },
  apellido1: { required: true },
  apellido2: { required: true },
  condicion: { required: true },
};

export default ({ id, reload, close }) => {
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
      const res = await axiosBase.post("admin/estudios/patentes/agregarAutor", {
        ...formValues,
        condicion: formValues.condicion.value,
        id: id,
        tipo: "externo",
      });
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
      size="large"
      onDismiss={close}
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
            <FormField label="Nombres" stretch>
              <Input
                placeholder="Escriba el nombre del autor"
                value={formValues.nombres}
                onChange={({ detail }) => handleChange("nombres", detail.value)}
              />
            </FormField>
            <FormField label="Apellido paterno" stretch>
              <Input
                placeholder="Escriba el ap. paterno del autor"
                value={formValues.apellido1}
                onChange={({ detail }) =>
                  handleChange("apellido1", detail.value)
                }
              />
            </FormField>
            <FormField label="Apellido materno" stretch>
              <Input
                placeholder="Escriba el ap. materno del autor"
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
              options={[{ value: "Inventor" }]}
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
