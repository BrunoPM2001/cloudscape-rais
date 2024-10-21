import {
  Box,
  Button,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Header,
  Input,
  Link,
  SpaceBetween,
  Spinner,
  Table,
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
  infinal7: "",
  infinal1: "",
  infinal3: "",
  infinal2: "",
  file1: [],
  file2: [],
};

const formRules = {
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file2: { isFile: true, maxSize: 6 * 1024 * 1024 },
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
          informe,
        },
      }
    );
    const data = res.data;
    setProyecto(data.proyecto);
    setMiembros(data.miembros);
    setFiles(data.archivos);
    if (data.informe) {
      handleChange("infinal7", data.informe.infinal7 ?? "");
      handleChange("infinal3", data.informe.infinal3 ?? "");
      handleChange("infinal1", data.informe.infinal1 ?? "");
      handleChange("infinal2", data.informe.infinal2 ?? "");
      handleChange("estado", data.informe.estado);
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
    form.append("infinal7", formValues.infinal7);
    form.append("infinal3", formValues.infinal3);
    form.append("infinal1", formValues.infinal1);
    form.append("infinal2", formValues.infinal2);
    form.append("file1", formValues.file1[0]);
    form.append("file2", formValues.file2[0]);
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
      "investigador/informes/informe_academico/verInforme",
      {
        params: {
          id: formValues.id,
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
      ) : formValues.estado ? (
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
                        {loading ? <Spinner /> : <Box>{proyecto.periodo}</Box>}
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
                        {loading ? <Spinner /> : <Box>{proyecto.facultad}</Box>}
                      </div>
                      <div>
                        <Box variant="awsui-key-label">
                          Línea de investigación
                        </Box>
                        {loading ? <Spinner /> : <Box>{proyecto.linea}</Box>}
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
              title: "Entregables",
              content: (
                <Container>
                  <ColumnLayout columns={2}>
                    <FormField
                      label="Tesis concluida y aprobada"
                      description={
                        files["informe-PTPDOCTO-INFORME-FINAL-tesis"] && (
                          <>
                            Ya ha cargado un{" "}
                            <Link
                              {...propsEnlaces}
                              href={
                                files["informe-PTPDOCTO-INFORME-FINAL-tesis"]
                              }
                            >
                              archivo.
                            </Link>
                          </>
                        )
                      }
                      errorText={formErrors.file1}
                      stretch
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
                      label="Acta de sustentación"
                      description={
                        files["informe-PTPDOCTO-INFORME-FINAL-acta"] && (
                          <>
                            Ya ha cargado un{" "}
                            <Link
                              {...propsEnlaces}
                              href={
                                files["informe-PTPDOCTO-INFORME-FINAL-acta"]
                              }
                            >
                              archivo.
                            </Link>
                          </>
                        )
                      }
                      errorText={formErrors.file2}
                      stretch
                    >
                      <FileUpload
                        {...propsRepetidas}
                        value={formValues.file2}
                        onChange={({ detail }) => {
                          handleChange("file2", detail.value);
                        }}
                      />
                    </FormField>
                  </ColumnLayout>
                </Container>
              ),
              isOptional: true,
            },
            {
              title: "Resultados",
              content: (
                <Tiptap
                  value={formValues.infinal1}
                  handleChange={handleChange}
                  name="infinal1"
                  limitWords={200}
                />
              ),
              isOptional: true,
            },
            {
              title: "Problemas identificados",
              content: (
                <Tiptap
                  value={formValues.infinal2}
                  handleChange={handleChange}
                  name="infinal2"
                  limitWords={200}
                />
              ),
              isOptional: true,
            },
          ]}
        />
      )}
    </>
  );
};
