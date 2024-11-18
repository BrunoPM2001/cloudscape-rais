import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  FormField,
  FileUpload,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

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

export default ({ id, close, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregar = async () => {
    if (validateForm()) {
      setLoading(true);
      const form = new FormData();
      form.append("proyecto_id", id);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/convocatorias/pconfigi/agregarDoc",
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
      visible
      size="medium"
      onDismiss={close}
      header="Documento de colaboración externa"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregar} loading={loading}>
              Guardar
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormField
        label="Archivo"
        description="Solo se permiten archivos en pdf y de máximo 6 MB"
        errorText={formErrors.file}
        stretch
      >
        <FileUpload
          {...propsRepetidas}
          value={formValues.file}
          onChange={({ detail }) => {
            handleChange("file", detail.value);
          }}
        />
      </FormField>
    </Modal>
  );
};
