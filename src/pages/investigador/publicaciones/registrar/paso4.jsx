import {
  Alert,
  Button,
  Container,
  FileUpload,
  FormField,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { forwardRef, useContext, useImperativeHandle } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

const initialForm = {
  anexo: [],
};

const formRules = {
  anexo: { required: false, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default forwardRef(function ({ publicacion_id, tipo }, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, {
      anexo: {
        ...formRules.anexo,
        required: tipo == "articulo" ? true : false,
      },
    });

  //  Functions
  const registrar = async () => {
    if (validateForm()) {
      let form = new FormData();
      form.append("publicacion_id", publicacion_id);
      form.append("file", formValues.anexo[0]);
      const res = await axiosBase.post(
        "investigador/publicaciones/utils/enviarPublicacion",
        form
      );
      const data = res.data;
      pushNotification(data.detail, data.message, notifications.length + 1);
      return { isValid: true, res_publicacion_id: null };
    } else {
      return { isValid: false };
    }
  };

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <SpaceBetween size="m">
        <Alert
          header="Resumen de publicación"
          action={<Button variant="primary">Previsualizar</Button>}
        >
          Si desea puede previsualizar el informe de resumen de su publicación.
        </Alert>
        <Alert header="Declaración jurada">
          Declara bajo juramento que toda información consignada en este
          formulario es verídica.
        </Alert>
        <FormField label="Anexo" stretch errorText={formErrors.anexo}>
          <FileUpload
            value={formValues.anexo}
            onChange={({ detail }) => handleChange("anexo", detail.value)}
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
            accept=".jpeg, .jpg, .png,  .pdf"
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
});
