import {
  Box,
  Button,
  FileUpload,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  nombre: "",
  comentario: "",
  file: [],
};

const formRules = {
  nombre: { required: true },
  file: { required: true, isFile: true, maxSize: 25 * 1024 * 1024 },
};

export default ({ id, doc_tipo, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [creating, setCreating] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setCreating(true);
      let formulario = new FormData();
      formulario.append("id", id);
      formulario.append("doc_tipo", doc_tipo);
      formulario.append("nombre", formValues.nombre);
      formulario.append("comentario", formValues.comentario);
      formulario.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/actividades/fex/registrarPaso3",
        formulario
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      setCreating(false);
      reload();
      close();
    }
  };

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Agregar documento"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregar} loading={creating}>
              Agregar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <FormField
          label="Nombre de documento"
          errorText={formErrors.nombre}
          stretch
        >
          <Input
            value={formValues.nombre}
            onChange={({ detail }) => handleChange("nombre", detail.value)}
          />
        </FormField>
        <FormField label="Comentario" errorText={formErrors.comentario} stretch>
          <Input
            value={formValues.comentario}
            onChange={({ detail }) => handleChange("comentario", detail.value)}
          />
        </FormField>
        <FormField label="Archivo" errorText={formErrors.file} stretch>
          <FileUpload
            value={formValues.file}
            onChange={({ detail }) => handleChange("file", detail.value)}
            showFileLastModified
            showFileSize
            showFileThumbnail
            constraintText="El archivo cargado no debe superar los 25 MB"
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
    </Modal>
  );
};
