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
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import { useAutosuggest } from "../../../../../../hooks/useAutosuggest";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axiosBase from "../../../../../../api/axios";
import { NotificationContext } from "../../../../../../routes/admin";

const initialForm = {
  file: [],
};

const formRules = {
  file: { required: true, isFile: true, maxSize: 2 * 1024 * 1024 },
};

export default ({ visible, setVisible, reload }) => {
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
    useAutosuggest("estudiante");
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "admin/estudios/grupos/incluirMiembroData",
      {
        params: {
          tipo: "estudiante",
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

  const agregarMiembro = async () => {
    if (validateForm()) {
      setLoadingCreate(true);
      const res = await axiosBase.post("admin/estudios/grupos/agregarMiembro", {
        tipo_registro: "estudiante",
        investigador_id: form.investigador_id,
        grupo_id: id,
        condicion: "Adherente",
      });
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
              onClick={() => agregarMiembro()}
              loading={loadingCreate}
            >
              Incluir miembro
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Incluir miembro al grupo"
    >
      <Form variant="embedded">
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
                      <Box variant="awsui-key-label">
                        Último periodo matriculado:
                      </Box>
                      <>{form.ultimo_periodo_matriculado}</>
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
                    Verificando si pertenece a algún grupo de investigación
                  </Box>
                </SpaceBetween>
              ) : (
                <>
                  <Alert
                    type={incluirMiembroData.message}
                    header={incluirMiembroData.detail}
                  />
                  {enableCreate == false && (
                    <Form variant="embedded">
                      <FormField
                        label="Formato de adhesión"
                        errorText={formErrors.file}
                      >
                        <FileUpload
                          value={formValues.file}
                          onChange={({ detail }) =>
                            handleChange("file", detail.value)
                          }
                          ref={(ref) => registerFileInput("file", ref)}
                          showFileLastModified
                          showFileSize
                          showFileThumbnail
                          constraintText="El archivo cargado no debe superar los 2 MB"
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
