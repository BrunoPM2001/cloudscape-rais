import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Input,
  FileUpload,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";

const initialForm = {
  codigo_proyecto: "",
  nombre_proyecto: "",
  entidad_financiadora: "",
  file: [],
};

const formRules = {
  codigo_proyecto: { required: false },
  nombre_proyecto: { required: true },
  entidad_financiadora: { required: true },
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarProyecto = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const form = new FormData();
      form.append("publicacion_id", id);
      form.append("codigo_proyecto", formValues.codigo_proyecto);
      form.append("nombre_proyecto", formValues.nombre_proyecto);
      form.append("entidad_financiadora", formValues.entidad_financiadora);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/publicaciones/utils/agregarProyecto",
        form
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
              onClick={() => agregarProyecto()}
              loading={loadingCreate}
            >
              Agregar proyecto
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar proyecto registrado en la UNMSM"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField
            label="Título del proyecto"
            stretch
            errorText={formErrors.nombre_proyecto}
          >
            <Input
              placeholder="Escriba el título de proyecto"
              value={formValues.nombre_proyecto}
              onChange={({ detail }) =>
                handleChange("nombre_proyecto", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Código de proyecto"
            stretch
            errorText={formErrors.codigo_proyecto}
          >
            <Input
              placeholder="Escriba el código de proyecto"
              value={formValues.codigo_proyecto}
              onChange={({ detail }) =>
                handleChange("codigo_proyecto", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Fuente financiadora"
            stretch
            errorText={formErrors.entidad_financiadora}
          >
            <Input
              placeholder="Escriba la fuente financiadora de proyecto"
              value={formValues.entidad_financiadora}
              onChange={({ detail }) =>
                handleChange("entidad_financiadora", detail.value)
              }
            />
          </FormField>
          <FormField
            label="Documento de sustento"
            stretch
            errorText={formErrors.file}
          >
            <FileUpload
              value={formValues.file}
              onChange={({ detail }) => {
                handleChange("file", detail.value);
              }}
              showFileLastModified
              showFileSize
              showFileThumbnail
              constraintText="El archivo cargado no debe superar los 6 MB"
              i18nStrings={{
                uploadButtonText: (e) =>
                  e ? "Cargar archivos" : "Cargar archivo",
                dropzoneText: (e) =>
                  e
                    ? "Arrastre los archivos para cargarlos"
                    : "Arrastre el archivo para cargarlo",
                removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
                errorIconAriaLabel: "Error",
              }}
              accept=".pdf"
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
