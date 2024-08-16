import {
  Alert,
  Button,
  Container,
  FileUpload,
  FormField,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

const initialForm = {
  anexo: [],
};

const formRules = {
  anexo: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default forwardRef(function ({ publicacion_id, tipo }, ref) {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingReport, setLoadingReport] = useState(false);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

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
      return true;
    } else {
      return false;
    }
  };

  const reporte = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/reporte",
      {
        params: {
          publicacion_id,
          tipo,
        },
        responseType: "blob",
      }
    );
    setLoadingReport(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useImperativeHandle(ref, () => ({
    registrar,
  }));

  return (
    <Container>
      <SpaceBetween size="m">
        <Alert
          header="Resumen de publicación"
          action={
            <Button variant="primary" loading={loadingReport} onClick={reporte}>
              Previsualizar
            </Button>
          }
        >
          Si desea puede previsualizar el informe de resumen de su publicación.
        </Alert>
        <Alert header="Declaración jurada">
          Declara bajo juramento que toda información consignada en este
          formulario es verídica.
        </Alert>
        <FormField label="Anexo" stretch errorText={formErrors.anexo}>
          <FileUpload
            warningText={
              tipo == "evento" &&
              "En caso haya colocado una URL en el paso 1 no es obligatorio que cargue el anexo, de lo contrario cárguelo ahora."
            }
            value={formValues.anexo}
            onChange={({ detail }) => handleChange("anexo", detail.value)}
            showFileLastModified
            showFileSize
            showFileThumbnail
            constraintText="Adjunte el acta de sustentación (el archivo cargado no debe superar los 6 MB)"
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
