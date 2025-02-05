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
  Link,
  Popover,
  DatePicker,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const optFiliacion = [
  {
    value: "1",
    label: "Sí",
  },
  {
    value: "0",
    label: "No",
  },
];

const formRules = {
  autor: { required: true },
  filiacion: { required: true },
  filiacion_unica: { required: true },
  categoria: { required: true },
};

export default ({ item, reload, close, optAutor }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(
      {
        autor: item.autor ?? "",
        filiacion: optFiliacion.find((opt) => opt.label == item.filiacion),
        filiacion_unica: optFiliacion.find(
          (opt) => opt.label == item.filiacion_unica
        ),
        categoria: { value: item.categoria },
        nro_registro: item.nro_registro,
        fecha_registro: item.fecha_registro,
      },
      formRules
    );

  //  Functions
  const actualizarAutor = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.put(
        "admin/estudios/publicaciones/editarAutor",
        {
          id: item.id,
          autor: formValues.autor,
          filiacion: formValues.filiacion.value,
          filiacion_unica: formValues.filiacion_unica.value,
          categoria: formValues.categoria.value,
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
      size="medium"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={actualizarAutor}
              loading={loadingCreate}
            >
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar autor"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
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
          <ColumnLayout columns={3} minColumnWidth={180}>
            <FormField
              label="Filiación UNMSM"
              stretch
              info={
                <Popover
                  header="Descripción"
                  content="En caso la publicación presente filiación con San Marcos"
                >
                  <Link variant="info">Info</Link>
                </Popover>
              }
              errorText={formErrors.filiacion}
            >
              <Select
                placeholder="Escoja una opción"
                selectedOption={formValues.filiacion}
                onChange={({ detail }) => {
                  handleChange("filiacion", detail.selectedOption);
                }}
                options={optFiliacion}
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
                options={optFiliacion}
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
              />
            </FormField>
          </ColumnLayout>
          <ColumnLayout columns={2}>
            <FormField
              label="N° de registro"
              errorText={formErrors.nro_registro}
              stretch
            >
              <Input
                value={formValues.nro_registro}
                onChange={({ detail }) =>
                  handleChange("nro_registro", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Fecha de registro"
              errorText={formErrors.fecha_registro}
              stretch
            >
              <DatePicker
                placeholder="YYYY/MM/DD"
                value={formValues.fecha_registro}
                onChange={({ detail }) =>
                  handleChange("fecha_registro", detail.value)
                }
              />
            </FormField>
          </ColumnLayout>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
