import {
  Modal,
  Box,
  Button,
  Link,
  Alert,
  Header,
  SpaceBetween,
  FormField,
  FileUpload,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../../hooks/useFormValidation";
import { useContext, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios";

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  i18nStrings: {
    uploadButtonText: (e) => (e ? "Cargar archivos" : "Cargar documento"),
    dropzoneText: (e) =>
      e
        ? "Arrastre los archivos para cargarlos"
        : "Arrastre el archivo para cargarlo",
    removeFileAriaLabel: (e) => `Eliminar archivo ${e + 1}`,
    errorIconAriaLabel: "Error",
  },
  accept: ".pdf",
};

export default function ModalDj({ onClose, proyecto_id, reload }) {
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

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { notifications, pushNotification } = useContext(NotificationContext);

  const enviarDj = async () => {
    if (validateForm()) {
      setLoadingUpdate(true);
      const form = new FormData();
      form.append("proyecto_id", proyecto_id);
      form.append("file", formValues.file[0]);
      const res = await axiosBase.post(
        "investigador/actividades/conFinanciamiento/uploadDocumento/",
        form
      );
      const data = res.data;
      setLoadingUpdate(false);
      onClose();
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  return (
    <Modal
      visible
      size="medium"
      onDismiss={onClose}
      header="Imformación Importante"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={enviarDj}
              loading={loadingUpdate}
            >
              Enviar Dj firmada
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box variant="p">
          Estimado(a) Responsable del <strong>Proyecto Ganador</strong> del
          concurso
          <strong>
            {" "}
            PROYECTOS DE INNOVACIÓN PARA GRUPOS DE INVESTIGACIÓN (PCONFIGI-INV)
          </strong>
          , se le solicita subir su
          <strong> Declaración Jurada firmada</strong>, la cual puede contar con{" "}
          <strong> firma digital</strong> o
          <strong> firma manuscrita escaneada</strong>.
          <br />
          <br />
          El documento que adjunte debe representar correctamente sus datos
          personales y reflejar con claridad si está de acuerdo con los términos
          establecidos. Una vez enviada,{" "}
          <strong> no será posible modificar la declaración</strong>.
          <br />
          <br />
          Este documento es requisito indispensable para que la{" "}
          <strong> Oficina de Tesorería</strong> proceda con el
          <strong> depósito de la subvención económica</strong> a su cuenta. Le
          recomendamos revisar cuidadosamente el contenido antes de realizar la
          carga.
        </Box>
      </SpaceBetween>

      <FormField
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
}
