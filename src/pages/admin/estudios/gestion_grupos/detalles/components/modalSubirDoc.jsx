import {
  Box,
  Button,
  FileUpload,
  FormField,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useContext, useState } from "react";

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

export default ({ close, grupo_id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  //  Hooks
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(
    { file: [] },
    { file: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 } }
  );

  //  Functions
  const update = async () => {
    if (validateForm()) {
      setLoadingUpdate(true);
      const form = new FormData();
      form.append("grupo_id", grupo_id);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "admin/estudios/grupos/updateDocumento",
        form
      );
      const data = res.data;
      setLoadingUpdate(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      close();
      reload();
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Editar documento adjunto"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={update} loading={loadingUpdate}>
              Subir
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormField
        label="Resoluciones decanales o constancias"
        errorText={formErrors.file}
        stretch
      >
        <FileUpload
          {...propsRepetidas}
          value={formValues.file}
          onChange={({ detail }) => handleChange("file", detail.value)}
          ref={(ref) => registerFileInput("file", ref)}
        />
      </FormField>
    </Modal>
  );
};
