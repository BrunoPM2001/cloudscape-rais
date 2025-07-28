import {
  Alert,
  Box,
  Button,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Header,
  Link,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import Tiptap from "../../../../components/tiptap";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  id: null,
  estado: 0,
  resumen_ejecutivo: "",
  infinal1: "",
  infinal2: "",
  infinal3: "",
  infinal4: "",
  infinal5: "",
  infinal6: "",
  file1: [],
  file2: [],
  file3: [],
  file4: [],
  file5: [],
  file6: [],
};

const formRules = {
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file2: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file3: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file4: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file5: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file6: { isFile: true, maxSize: 6 * 1024 * 1024 },
};

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText: "El archivo cargado no debe superar los 6 MB",
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

const propsEnlaces = {
  external: "true",
  variant: "primary",
  fontSize: "body-s",
  target: "_blank",
};

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id, proyecto_id, tipo_proyecto, informe } = queryString.parse(
    location.search
  );

  //  States
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [files, setFiles] = useState({});
  const [proyecto, setProyecto] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_academico/getData",
      {
        params: {
          id,
          proyecto_id,
          tipo_proyecto,
        },
      }
    );
    const data = res.data;
    setProyecto(data.proyecto);
    setFiles(data.archivos);
    if (data.informe) {
      handleChange("resumen_ejecutivo", data.informe.resumen_ejecutivo ?? "");
      handleChange("infinal1", data.informe.infinal1 ?? "");
      handleChange("infinal2", data.informe.infinal2 ?? "");
      handleChange("infinal3", data.informe.infinal3 ?? "");
      handleChange("infinal4", data.informe.infinal4 ?? "");
      handleChange("infinal5", data.informe.infinal5 ?? "");
      handleChange("infinal6", data.informe.infinal6 ?? "");
      handleChange("estado", data.informe.estado);
      handleChange("observaciones", data.informe.observaciones);
      handleChange("id", data.informe.id);
    }
    setLoading(false);
  };

  const sendData = async () => {
    setLoadingSave(true);
    const form = new FormData();
    form.append("id", id);
    form.append("proyecto_id", proyecto_id);
    form.append("tipo_proyecto", tipo_proyecto);
    form.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
    form.append("infinal1", formValues.infinal1);
    form.append("infinal2", formValues.infinal2);
    form.append("infinal3", formValues.infinal3);
    form.append("infinal4", formValues.infinal4);
    form.append("infinal5", formValues.infinal5);
    form.append("infinal6", formValues.infinal6);
    form.append("file1", formValues.file1[0]);
    form.append("file2", formValues.file2[0]);
    form.append("file3", formValues.file3[0]);
    form.append("file4", formValues.file4[0]);
    form.append("file5", formValues.file5[0]);
    form.append("file6", formValues.file6[0]);
    const res = await axiosBase.post(
      "investigador/informes/informe_academico/sendData",
      form
    );
    const data = res.data;
    setLoadingSave(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  const presentar = async () => {
    setLoadingSave(true);
    const res = await axiosBase.put(
      "investigador/informes/informe_academico/presentar",
      {
        id,
        proyecto_id,
        tipo_proyecto,
      }
    );
    const data = res.data;
    data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    getData();
    setLoadingSave(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/informes/informe_academico/reporte",
      {
        params: {
          informe_tecnico_id: id,
          tipo_informe: informe,
          tipo_proyecto,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingBtn(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <br />
          <Container>
            <Spinner /> Cargando datos
          </Container>
        </>
      ) : formValues.estado == 1 || formValues.estado == 2 ? (
        <>
          <br />
          <Container
            header={
              <Header
                actions={
                  <Button
                    iconName="file"
                    loading={loadingBtn}
                    onClick={reporte}
                  >
                    Reporte
                  </Button>
                }
              >
                Informe presentado
              </Header>
            }
          >
            <SpaceBetween size="m">
              <div>
                <Box variant="awsui-key-label">Título</Box>
                <Box>{proyecto.titulo}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Código</Box>
                <Box>{proyecto.codigo_proyecto}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Año</Box>
                <Box>{proyecto.periodo}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Tipo de proyecto</Box>
                <Box>{tipo_proyecto}</Box>
              </div>
            </SpaceBetween>
          </Container>
        </>
      ) : (
        <SpaceBetween size="xs">
          {formValues.estado == 3 && (
            <Box margin={{ top: "s" }}>
              <Alert type="error" header="Observaciones">
                {formValues.observaciones}
              </Alert>
            </Box>
          )}
          <Wizard
            onNavigate={({ detail }) => setStep(detail.requestedStepIndex)}
            activeStepIndex={step}
            onCancel={() => {
              window.location.href = "../informeAcademico";
            }}
            i18nStrings={{
              optional: "Completar",
            }}
            secondaryActions={
              <Button onClick={sendData} loading={loadingSave}>
                Guardar informe
              </Button>
            }
            onSubmit={presentar}
            isLoadingNextStep={loadingSave}
            submitButtonText="Enviar informe"
            allowSkipTo
            steps={[
              {
                title: "Información",
                description:
                  "Programa de equipamiento científico para investigación de la UNMSM",
                content: (
                  <Container>
                    <SpaceBetween size="m">
                      <div>
                        <Box variant="awsui-key-label">Título</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.titulo}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Código</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.codigo_proyecto}</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Resolución</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.resolucion}</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Año</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.periodo}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Grupo </Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.grupo_nombre}</Box>
                        )}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Facultad</Box>
                        {loading ? <Spinner /> : <Box>{proyecto.facultad}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">Coordinador</Box>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Box>{proyecto.responsable}</Box>
                        )}
                      </div>
                    </SpaceBetween>
                  </Container>
                ),
              },
              {
                title: "Resumen",
                description:
                  "Breve descripción de los equipos/gabinete adquiridos",
                content: (
                  <Tiptap
                    value={formValues.resumen_ejecutivo}
                    handleChange={handleChange}
                    name="resumen_ejecutivo"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Proceso de instalación",
                description:
                  "Se expone todo el proceso de instalación del equipo/gabinete",
                content: (
                  <Tiptap
                    value={formValues.infinal1}
                    handleChange={handleChange}
                    name="infinal1"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Funcionamiento",
                description: "Describir la situación actual del funcionamiento",
                content: (
                  <Tiptap
                    value={formValues.infinal2}
                    handleChange={handleChange}
                    name="infinal2"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Gestión de uso",
                description: "Describir la situación actual del funcionamiento",
                content: (
                  <Tiptap
                    value={formValues.infinal3}
                    handleChange={handleChange}
                    name="infinal3"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Aplicación práctica e impacto",
                description:
                  "Señale las aplicaciones prácticas más importantes, el aporte o conclusión principal e impacto para la sociedad",
                content: (
                  <Tiptap
                    value={formValues.infinal4}
                    handleChange={handleChange}
                    name="infinal4"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Impacto - uso",
                description:
                  "Indicar los resultados del uso del equipo/gabinete como: publicación, tesis o patente, incluir usos en colaboración y/o compartido",
                content: (
                  <Tiptap
                    value={formValues.infinal5}
                    handleChange={handleChange}
                    name="infinal5"
                  />
                ),
                isOptional: true,
              },
              {
                title: "Documentos adjuntos",
                description: "Archivos adjuntos",
                content: (
                  <Container>
                    <ColumnLayout columns={2}>
                      <FormField
                        label="Documento de conformidad firmada por el coordinador del GI"
                        description={
                          files.anexo1 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo1}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file1}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file1}
                          onChange={({ detail }) => {
                            handleChange("file1", detail.value);
                          }}
                        />
                      </FormField>
                      <FormField
                        label="Imágenes del equipo/gabinete instalado"
                        description={
                          files.anexo2 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo2}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file2}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file2}
                          onChange={({ detail }) => {
                            handleChange("file2", detail.value);
                          }}
                        />
                      </FormField>
                      <FormField
                        label="Imágenes de equipos complementarios al equipo/gabinete instalado"
                        description={
                          files.anexo3 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo3}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file3}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file3}
                          onChange={({ detail }) => {
                            handleChange("file3", detail.value);
                          }}
                        />
                      </FormField>
                      <FormField
                        label="Formato de control del uso del equipo, incluir uso compartido"
                        description={
                          files.anexo4 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo4}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file4}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file4}
                          onChange={({ detail }) => {
                            handleChange("file4", detail.value);
                          }}
                        />
                      </FormField>
                      <FormField
                        label="Plan de manejo de residuos, efluentes y/o emisiones"
                        description={
                          files.anexo5 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo5}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file5}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file5}
                          onChange={({ detail }) => {
                            handleChange("file5", detail.value);
                          }}
                        />
                      </FormField>
                      <FormField
                        label="Otros documentos (Adjuntar la PECOSA y NEA)"
                        description={
                          files.anexo6 && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files.anexo6}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                        stretch
                        errorText={formErrors.file6}
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file6}
                          onChange={({ detail }) => {
                            handleChange("file6", detail.value);
                          }}
                        />
                      </FormField>
                    </ColumnLayout>
                  </Container>
                ),
                isOptional: true,
              },
              {
                title: "Dificultades",
                description: "Dificultades encontradas",
                content: (
                  <Tiptap
                    value={formValues.infinal6}
                    handleChange={handleChange}
                    name="infinal6"
                  />
                ),
                isOptional: true,
              },
            ]}
          />
        </SpaceBetween>
      )}
    </>
  );
};
