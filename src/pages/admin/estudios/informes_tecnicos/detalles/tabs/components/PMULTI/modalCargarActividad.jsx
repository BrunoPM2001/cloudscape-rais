import {
  Box,
  Button,
  FileUpload,
  FormField,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../../../api/axios";

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar archivo"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf",
};

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ id, indice, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const loadFile = async () => {
    if (validateForm()) {
      setLoading(true);
      const form = new FormData();
      form.append("id", id);
      form.append("indice", indice);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "admin/estudios/informesTecnicos/loadActividad",
        form
      );
      const info = res.data;
      pushNotification(info.detail, info.message, notifications.length + 1);
      setLoading(false);
      close();
      reload();
    }
  };

  return (
    <Modal
      visible
      size="medium"
      header="Cargar archivo para la actividad"
      onDismiss={close}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" loading={loading} onClick={loadFile}>
              Cargar actividad
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormField
        label="Archivo de actividad"
        description="No mayor a 6 MB y en formato pdf"
        errorText={formErrors.file}
      >
        <FileUpload
          {...propsRepetidas}
          value={formValues.file}
          onChange={({ detail }) => handleChange("file", detail.value)}
        />
      </FormField>
    </Modal>
  );
};
