import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Select,
  Spinner,
  Alert,
  Link,
  FileUpload,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";

const initialForm = {
  opt: null,
  carta: [],
};

const formRules = {
  opt: { required: true },
  carta: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ id, close, reload }) => {
  const { notifications, pushNotification } = useContext(NotificationContext);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [adherentes, setAdherentes] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const getAdherentes = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listarAdherentes",
      {
        params: { proyecto_id: id },
      }
    );
    const data = res.data;

    setAdherentes(data);
    setLoadingData(false);
  };

  const agregarAdherente = async () => {
    if (validateForm()) {
      let data = new FormData();
      data.append("proyecto_id", id);
      data.append("investigador_id", formValues.opt.investigador_id);
      data.append("file", formValues.carta[0]);

      setLoadingAdd(true);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/pro-ctie/agregarAdherente",
        data
      );
      const info = res.data;
      pushNotification(info.detail, info.message, notifications.length + 1);
      reload();
      close();
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    getAdherentes();
  }, []);

  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Agregar adherente"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={agregarAdherente}
              disabled={loadingData}
              loading={loadingAdd}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <Form>
        <FormField label="Adherente" errorText={formErrors.opt} stretch>
          <Select
            placeholder="Seleccione un adherente"
            empty="No hay adherentes disponibles"
            loadingText="Cargando data"
            statusType={loadingData ? "loading" : "finished"}
            selectedOption={formValues.opt}
            onChange={({ detail }) =>
              handleChange("opt", detail.selectedOption)
            }
            options={adherentes}
          />
        </FormField>
        {formValues.opt && (
          <Box margin={{ top: "m" }}>
            <Alert header="Datos del adherente seleccionado" type="info">
              <Box
                display="grid"
                gridTemplateColumns={{
                  default: "1fr",
                  xs: "1fr",
                  s: "1fr 1fr",
                  m: "1fr 1fr 1fr",
                }}
                gap="l"
                padding="s"
              >
                <div>
                  <strong>Apellidos y nombres:</strong>
                  <br />
                  {formValues.opt.apellidos}, {formValues.opt.nombres}
                </div>
                <div>
                  <strong>DNI:</strong>
                  <br />
                  {formValues.opt.doc_numero}
                </div>
                <div>
                  <strong>Código:</strong>
                  <br />
                  {formValues.opt.codigo || "No disponible"}
                </div>
                <div>
                  <strong>Facultad:</strong>
                  <br />
                  {formValues.opt.facultad || "No disponible"}
                </div>
                <div>
                  <strong>Permanencia:</strong>
                  <br />
                  {formValues.opt.permanencia || "Activo"}
                </div>
                <div>
                  <strong>Correo:</strong>
                  <br />
                  {formValues.opt.email1 || "No disponible"}
                </div>
              </Box>
            </Alert>
            <Box margin={{ top: "l" }}>
              <FormField
                label="Carta de compromiso"
                description={
                  <>
                    Puede descargar la plantilla en{" "}
                    <Link
                      href="/minio/templates/compromiso-confidencialidad.docx"
                      external
                      variant="primary"
                      fontSize="body-s"
                    >
                      este enlace
                    </Link>
                    .
                  </>
                }
                errorText={formErrors.carta}
              >
                <FileUpload
                  value={formValues.carta}
                  onChange={({ detail }) => handleChange("carta", detail.value)}
                  showFileLastModified
                  showFileSize
                  showFileThumbnail
                  constraintText="Archivo máximo 6 MB. Formatos permitidos: .docx, .pdf"
                  accept=".docx,.doc,.pdf"
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
                />
              </FormField>
            </Box>
          </Box>
        )}
      </Form>
    </Modal>
  );
};
