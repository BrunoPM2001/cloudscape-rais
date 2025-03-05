import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Button,
  FileUpload,
  Input,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../api/axios";

const initialForm = {
  comentario: "",
  file: [],
};

const formRules = {
  comentario: { required: true },
  file: { isFile: true, maxSize: 6 * 1024 * 1024, required: true },
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

export default ({ close, reload, id, tipo, categoria, nombre }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const agregarDoc = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formulario = new FormData();
      formulario.append("id", id);
      formulario.append("tipo", tipo);
      formulario.append("categoria", categoria);
      formulario.append("nombre", nombre);
      formulario.append("comentario", formValues.comentario);
      formulario.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/convocatorias/eci/agregarDoc",
        formulario
      );
      const data = res.data;
      setLoadingCreate(false);
      pushNotification(data.detail, data.message, notifications.length + 1);
      reload();
      close();
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
            <Button
              variant="primary"
              onClick={agregarDoc}
              loading={loadingCreate}
            >
              Agregar documento
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar documento al proyecto"
    >
      <SpaceBetween size="m">
        <FormField
          label="Comentario / Observación"
          errorText={formErrors.comentario}
          stretch
        >
          <Input
            placeholder="Escriba un comentario"
            value={formValues.comentario}
            onChange={({ detail }) => handleChange("comentario", detail.value)}
          />
        </FormField>
        <FormField label="Documento" stretch errorText={formErrors.file}>
          <FileUpload
            {...propsRepetidas}
            value={formValues.file}
            onChange={({ detail }) => {
              handleChange("file", detail.value);
            }}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};
