import {
  Modal,
  FormField,
  Box,
  SpaceBetween,
  Form,
  Button,
  Autosuggest,
  ColumnLayout,
  Spinner,
  Alert,
  FileUpload,
  Link,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  carta: [],
};

const formRules = {
  carta: { required: true, isFile: true, maxSize: 6 * 1024 * 1024 },
};

export default ({ id, visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingData, setLoadingData] = useState(false);
  const [enableCreate, setEnableCreate] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form, setForm] = useState({});
  const [incluirMiembroData, setIncluirMiembroData] = useState({});

  //  Hooks
  const { loading, options, setOptions, value, setValue, setAvoidSelect } =
    useAutosuggest("investigador/convocatorias/searchEstudiante");
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/verificarEstudiante",
      {
        params: {
          codigo: form.codigo_alumno,
        },
      }
    );
    const data = await res.data;
    setIncluirMiembroData(data);
    setLoadingData(false);
    if (data.message == "success") {
      setEnableCreate(false);
    }
  };

  const agregarIntegrante = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      let formData = new FormData();
      formData.append("proyecto_id", id);
      formData.append("sum_id", form.id);
      formData.append("investigador_id", form.investigador_id);
      formData.append("file", formValues.carta[0]);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/agregarIntegrante",
        formData
      );
      const data = res.data;
      setLoadingCreate(false);
      setVisible(false);
      reload();
      pushNotification(data.detail, data.message, notifications.length + 1);
    }
  };

  //  Effects
  useEffect(() => {
    if (Object.keys(form).length != 0) {
      getData();
    }
  }, [form]);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              disabled={enableCreate}
              variant="primary"
              onClick={agregarIntegrante}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir integrante al proyecto"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <FormField label="Buscar estudiante" stretch>
            <Autosuggest
              onChange={({ detail }) => {
                setOptions([]);
                setValue(detail.value);
                if (detail.value == "") {
                  setForm({});
                }
                setEnableCreate(true);
              }}
              onSelect={({ detail }) => {
                if (detail.selectedOption.id != undefined) {
                  const { value, ...rest } = detail.selectedOption;
                  setForm(rest);
                  setAvoidSelect(false);
                }
              }}
              value={value}
              options={options}
              loadingText="Cargando data"
              placeholder="Código, dni o nombre del estudiante"
              statusType={loading ? "loading" : "finished"}
              empty="No se encontraron resultados"
            />
          </FormField>
          {form.id != null && (
            <>
              <Alert>
                <ColumnLayout columns={3} variant="text-grid">
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Apellidos y nombres:</Box>
                      <>{`${form.apellido_paterno} ${form.apellido_materno}, ${form.nombres}`}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Dni:</Box>
                      <>{form.dni}</>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Código de estudiante:</Box>
                      <>{form.codigo_alumno}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Facultad:</Box>
                      <>{form.facultad}</>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween size="xxs">
                    <div>
                      <Box variant="awsui-key-label">Permanencia:</Box>
                      <>{form.permanencia}</>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Correo:</Box>
                      <>{form.correo_electronico}</>
                    </div>
                  </SpaceBetween>
                </ColumnLayout>
              </Alert>
              {loadingData ? (
                <SpaceBetween
                  direction="horizontal"
                  size="xs"
                  alignItems="center"
                >
                  <Spinner />
                  <Box variant="p">
                    Verificando si está incluído en algún proyecto
                  </Box>
                </SpaceBetween>
              ) : (
                <>
                  <Alert
                    type={incluirMiembroData.message}
                    header={incluirMiembroData.detail}
                  />
                  {enableCreate == false && (
                    <Form>
                      <FormField
                        label="Carta de compromiso"
                        description={
                          <>
                            Puede descargar la plantilla de carta de compromiso
                            en{" "}
                            <Link
                              href="/minio/templates/compromiso-confidencialidad.docx"
                              external="true"
                              variant="primary"
                              fontSize="body-s"
                              target="_blank"
                            >
                              este enlace.
                            </Link>
                          </>
                        }
                        errorText={formErrors.carta}
                      >
                        <FileUpload
                          value={formValues.carta}
                          onChange={({ detail }) =>
                            handleChange("carta", detail.value)
                          }
                          ref={(ref) => registerFileInput("carta", ref)}
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
                            removeFileAriaLabel: (e) =>
                              `Eliminar archivo ${e + 1}`,
                            errorIconAriaLabel: "Error",
                          }}
                          accept=".docx, .doc,  .pdf"
                        />
                      </FormField>
                    </Form>
                  )}
                </>
              )}
            </>
          )}
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
