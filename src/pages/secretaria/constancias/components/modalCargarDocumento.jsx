import {
  Modal,
  Box,
  SpaceBetween,
  Form,
  Button,
  DatePicker,
  FormField,
  Input,
  ColumnLayout,
  FileUpload,
  Alert,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";
import axiosBase from "../../../../api/axios";
import { useFormValidation } from "../../../../hooks/useFormValidation";

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 10 * 1024 * 1024 },
};

export default ({ id, nombre, archivo_firmado, close, reload }) => {
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
      let formData = new FormData();
      formData.append("id", id);
      formData.append("archivo_firmado", archivo_firmado);
      formData.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "secretaria/constancias/cargarDocumento",
        formData
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
            <Button variant="primary" onClick={agregar} loading={loading}>
              Cargar constancia
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Cargar constancia"
    >
      <SpaceBetween size="m">
        <Alert header="Recuerde cargar el documento firmado" />
        <FormField label="Investigador" stretch>
          <Input value={nombre} disabled />
        </FormField>
        <FormField label="Constancia" errorText={formErrors.file} stretch>
          <FileUpload
            value={formValues.file}
            onChange={({ detail }) => handleChange("file", detail.value)}
            showFileLastModified
            showFileSize
            showFileThumbnail
            constraintText="El archivo cargado no debe superar los 10 MB"
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
