import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  FormField,
  FileUpload,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ close, reload, proyecto_id }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const subir = async () => {
    if (validateForm()) {
      setLoading(true);
      let form = new FormData();
      form.append("proyecto_id", proyecto_id);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "evaluador/evaluaciones/cargarFicha",
        form
      );
      const data = res.data;
      setLoading(false);
      close();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      onDismiss={close}
      visible
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={subir} loading={loading}>
              Cargar documento
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Subir ficha de evaluación"
    >
      <FormField
        label="Ficha de evaluación"
        description="Tiene que cargar la ficha firmada"
        errorText={formErrors.file}
      >
        <FileUpload
          value={formValues.file}
          onChange={({ detail }) => handleChange("file", detail.value)}
          ref={(ref) => registerFileInput("file", ref)}
          showFileLastModified
          showFileSize
          showFileThumbnail
          constraintText="El archivo cargado no debe superar los 6 MB"
          i18nStrings={{
            uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
            dropzoneText: (e) =>
              e
                ? "Arrastre los archivos para cargarlos"
                : "Arrastre el archivo para cargarlo",
            removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
            errorIconAriaLabel: "Error",
          }}
          accept=".jpeg, .jpg,  .pdf"
        />
      </FormField>
    </Modal>
  );
};
