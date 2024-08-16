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
  Popover,
  Link,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  nombres: "",
  apellido1: "",
  apellido2: "",
  autor: "",
  filiacion: null,
  filiacion_unica: null,
  categoria: null,
};

const formRules = {
  nombres: { required: true },
  apellido1: { required: true },
  apellido2: { required: true },
  autor: { required: true },
  filiacion: { required: true },
  filiacion_unica: { required: true },
  categoria: { required: true },
};

export default ({ id, visible, setVisible, reload, optAutor }) => {
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
        "investigador/publicaciones/utils/agregarAutor",
        {
          ...formValues,
          filiacion: formValues.filiacion.value,
          filiacion_unica: formValues.filiacion_unica.value,
          categoria: formValues.categoria.value,
          publicacion_id: id,
          tipo: "externo",
        }
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
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
            <FormField label="Nombres" stretch errorText={formErrors.nombres}>
              <Input
                placeholder="Escriba el nombre del autor"
                value={formValues.nombres}
                onChange={({ detail }) => handleChange("nombres", detail.value)}
              />
            </FormField>
            <FormField
              label="Apellido paterno"
              stretch
              errorText={formErrors.apellido1}
            >
              <Input
                placeholder="Escriba el ap. paterno del autor"
                value={formValues.apellido1}
                onChange={({ detail }) =>
                  handleChange("apellido1", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Apellido materno"
              stretch
              errorText={formErrors.apellido2}
            >
              <Input
                placeholder="Escriba el ap. materno del autor"
                value={formValues.apellido2}
                onChange={({ detail }) =>
                  handleChange("apellido2", detail.value)
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
          <ColumnLayout columns={3}>
            <FormField
              label="Filiación"
              info={
                <Popover
                  header="Descripción"
                  content="En caso la publicación presente filiación con San Marcos"
                >
                  <Link variant="info">Info</Link>
                </Popover>
              }
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
              />
            </FormField>
            <FormField
              label="Filiación única"
              info={
                <Popover
                  header="Descripción"
                  content="En caso la publicación solo presente filiación con una institución"
                >
                  <Link variant="info">Info</Link>
                </Popover>
              }
              stretch
              errorText={formErrors.filiacion_unica}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.filiacion_unica}
                onChange={({ detail }) => {
                  handleChange("filiacion_unica", detail.selectedOption);
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
              />
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
