import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
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
  autor: "",
  filiacion: null,
  categoria: null,
};

const formRules = {
  autor: { required: true },
  filiacion: { required: true },
  categoria: { required: true },
};

export default ({ id, reload, close, optAutor }) => {
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
        "admin/estudios/publicaciones/agregarAutor",
        {
          ...formValues,
          filiacion: formValues.filiacion.value,
          categoria: formValues.categoria.value,
          id: id,
          tipo: "externo",
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
                  handleChange("apellido2", detail.aqhora)
                }
              />
            </FormField>
          </ColumnLayout>
          <FormField
            label="Nombre con el que aparece en la publicación"
            stretch
            errorText={formErrors.autor}
          >
            <Input
              placeholder="Escriba el nombre del autor con el que aparece en la publicación"
              value={formValues.autor}
              onChange={({ detail }) => handleChange("autor", detail.value)}
            />
          </FormField>
          <ColumnLayout columns={2}>
            <FormField
              label="Filiación"
              stretch
              errorText={formErrors.filiacion}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.filiacion}
                onChange={({ detail }) => {
                  handleChange("filiacion", detail.selectedOption);
                }}
                options={[
                  {
                    value: "1",
                    label: "Sí",
                  },
                  {
                    value: "0",
                    label: "No",
                  },
                ]}
              ></Select>
            </FormField>
            <FormField
              label="Condición"
              stretch
              errorText={formErrors.categoria}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.categoria}
                onChange={({ detail }) => {
                  handleChange("categoria", detail.selectedOption);
                }}
                options={optAutor}
              ></Select>
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
