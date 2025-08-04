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

export default ({ id, visible, setVisible, reload, existingStudents }) => {
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
    useAutosuggest("investigador/convocatorias/pro-ctie/searchEstudiante");
  const {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    registerFileInput,
  } = useFormValidation(initialForm, formRules);


  //  Functions
  const getData = async () => {
    try {
      setLoadingData(true);
      setEnableCreate(true);

      const res = await axiosBase.get(
        "investigador/convocatorias/pro-ctie/verificarEstudiante",
      {
        params: {
          codigo: form.codigo_alumno,
          proyecto_id: id,
          apellido1: form.apellido_paterno,
          apellido2: form.apellido_materno,
          nombres: form.nombres,
          doc_numero: form.dni,
        },
      }
    );

    const data = res.data;
    setIncluirMiembroData(data);
    setEnableCreate(data.message !== "success");
  } catch (e) {
    setIncluirMiembroData({
      message: "error",
      detail: "No se pudo verificar al estudiante. Intentalo nuevamente.",
    })
    setEnableCreate(true);
  } finally {
    setLoadingData(false);
  }
  };

  const checkIfStudentExists = (studentData) => {
    const normalize = (str) => (str || "").toUpperCase().trim();

    return existingStudents.some((existingStudent) => {
      const sameDNI = existingStudent.dni === studentData.dni;
      const sameCode = existingStudent.codigo_alumno === studentData.codigo_alumno;
      const sameFullName =
        normalize(existingStudent.apellido_paterno) === normalize(studentData.apellido_paterno) &&
        normalize(existingStudent.apellido_materno) === normalize(studentData.apellido_materno) &&
        normalize(existingStudent.nombres) === normalize(studentData.nombres);
      return sameDNI || sameCode || sameFullName;
    })
  };

  const agregarIntegrante = async () => {
    if (incluirMiembroData?.message !== 'success') return;
    if (checkIfStudentExists(form)){
      pushNotification("Este estudiante ya esta agregado.", "warning", notifications.length+1);
      return;
    }
    if (validateForm()) {
      setLoadingCreate(true);
      let formData = new FormData();
      formData.append("proyecto_id", id);
      formData.append("sum_id", form.id);
      formData.append("investigador_id", form.investigador_id);
      formData.append("file", formValues.carta[0]);
      const res = await axiosBase.postForm(
        "investigador/convocatorias/pro-ctie/agregarIntegrante",
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
              disabled={enableCreate || loadingData}
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
                if (detail.value === "") {
                  setForm({});
                  setIncluirMiembroData({});
                }
                setEnableCreate(true);
              }}
              onSelect={({ detail }) => {
                const selected = detail.selectedOption;
                if (selected && selected.id !== undefined) {
                  const { value, ...rest } = selected;
                  setForm(rest);
                  setAvoidSelect(false);

                  setIncluirMiembroData({});
                  setEnableCreate(true);
                } else {
                  setForm({});
                  setEnableCreate(true);
                  setIncluirMiembroData({});
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
                    type={incluirMiembroData?.message === 'error' ? 'error': 'success'}
                    header={
                      incluirMiembroData?.message === 'error' 
                      ? 'No se puede incluir al estudiante'
                      : 'Validaciones superadas'
                    }
                  >
                    {Array.isArray(incluirMiembroData?.detail) ? (
                      <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                        {incluirMiembroData.detail.map((msg, i) => (
                          <li key ={i}>{msg}</li>
                        ))}
                      </ul>
                    ): (
                      incluirMiembroData?.detail
                    )}
                  </Alert>
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
