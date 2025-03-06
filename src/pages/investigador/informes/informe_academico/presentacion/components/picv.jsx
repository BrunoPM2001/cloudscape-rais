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
  Table,
  Wizard,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";

const initialForm = {
  id: null,
  estado: 0,
  file1: [],
  file2: [], // Agregado para evitar el error
};

const formRules = {
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
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
  const [miembros, setMiembros] = useState([]);

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
    setMiembros(data.miembros);
    setFiles(data.archivos);
    if (data.informe) {
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
    form.append("file1", formValues.file1[0]);
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
                  "Programa para la Inducción en Investigación Científica  en el Verano 2025 (PICV-UNMSM)",
                content: (
                  <SpaceBetween size="l">
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
                            <Box>{proyecto.resolucion_rectoral}</Box>
                          )}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Año</Box>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <Box>{proyecto.periodo}</Box>
                          )}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Grupo</Box>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <Box>{proyecto.grupo_nombre}</Box>
                          )}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Localización</Box>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <Box>{proyecto.localizacion}</Box>
                          )}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">Facultad</Box>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <Box>{proyecto.facultad}</Box>
                          )}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">
                            Línea de investigación
                          </Box>
                          {loading ? <Spinner /> : <Box>{proyecto.linea}</Box>}
                        </div>
                        <div>
                          <Box variant="awsui-key-label">
                            Tipo de investigación
                          </Box>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <Box>{proyecto.tipo_investigacion}</Box>
                          )}
                        </div>
                      </SpaceBetween>
                    </Container>
                    <Table
                      trackBy="id"
                      header={
                        <Header>Miembros del equipo de investigación</Header>
                      }
                      columnDefinitions={[
                        {
                          id: "condicion",
                          header: "Condición",
                          cell: (item) => item.condicion,
                        },
                        {
                          id: "nombres",
                          header: "Integrante",
                          cell: (item) => item.nombres,
                        },
                      ]}
                      columnDisplay={[
                        { id: "condicion", visible: true },
                        { id: "nombres", visible: true },
                      ]}
                      items={miembros}
                    />
                  </SpaceBetween>
                ),
              },
              {
                title: "Reporte Final",
                description:
                  "Archivos adjuntos (ninguno debe superar los 6 MB)",
                content: (
                  <Container>
                    <ColumnLayout columns={1}>
                      <FormField
                        label="Reporte Final"
                        info={
                          <Link
                            variant="info"
                            href="/minio/templates/anexo_picv.docx"
                          >
                            Descargar modelo
                          </Link>
                        }
                        constraintText="Remitir el formulario con los campos completados (ver modelo) a la Dirección de Promoción DGITT-VRIP dp.vrip@unmsm.edu.pe"
                        description={
                          files["informe-PICV-INFORME"] && (
                            <>
                              Ya ha cargado un{" "}
                              <Link
                                {...propsEnlaces}
                                href={files["informe-PICV-INFORME"]}
                              >
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
                    </ColumnLayout>
                  </Container>
                ),
                isOptional: false,
              },
            ]}
          />
        </SpaceBetween>
      )}
    </>
  );
};
