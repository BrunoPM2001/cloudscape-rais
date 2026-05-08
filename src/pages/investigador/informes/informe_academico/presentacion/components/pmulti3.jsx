import {
  Alert,
  Box,
  Button,
  ButtonDropdown,
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
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../../providers/notificationProvider";
import { useCollection } from "@cloudscape-design/collection-hooks";

const initialForm = {
  id: null,
  estado: 0,
  infinal1: "",
  infinal2: "",
  infinal3: "",
  file1: [],
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

const columnDefinitions = [
  {
    id: "actividad",
    header: "Actividad",
    cell: (item) => item.actividad,
    minWidth: 160,
  },
  {
    id: "justificacion",
    header: "Justificación",
    cell: (item) => item.justificacion,
    minWidth: 160,
  },
  {
    id: "responsable",
    header: "Responsable",
    cell: (item) => item.responsable,
    minWidth: 140,
  },
  {
    id: "fecha_inicio",
    header: "Fecha de inicio",
    cell: (item) => item.fecha_inicio,
    minWidth: 115,
  },
  {
    id: "fecha_fin",
    header: "Fecha de fin",
    cell: (item) => item.fecha_fin,
    minWidth: 115,
  },
];

const columnDisplay = [
  { id: "actividad", visible: true },
  { id: "justificacion", visible: true },
  { id: "responsable", visible: true },
  { id: "fecha_inicio", visible: true },
  { id: "fecha_fin", visible: true },
];

export default () => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [actividades, setActividades] = useState([]);
  const [modal, setModal] = useState("");
  const [faltantes, setFaltantes] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  const { items, actions, collectionProps, paginationProps } = useCollection(
    actividades,
    {
      sorting: {},
      selection: {},
    }
  );

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
    setActividades(data.actividades);
    if (data.informe) {
      handleChange("infinal1", data.informe.infinal1 ?? "");
      handleChange("infinal2", data.informe.infinal2 ?? "");
      handleChange("infinal3", data.informe.infinal3 ?? "");
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
    form.append("informe", informe);
    form.append("infinal1", formValues.infinal1);
    form.append("infinal2", formValues.infinal2);
    form.append("infinal3", formValues.infinal3);
    form.append("file1", formValues.file1[0]);
    const res = await axiosBase.post(
      "investigador/informes/informe_academico/sendData",
      form
    );
    const data = res.data;
    setLoadingSave(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("id", data.id);
    setSearchParams(newParams);
  };

  const presentar = async () => {
    setLoadingSave(true);
    const res = await axiosBase.put(
      "investigador/informes/informe_academico/presentar",
      {
        id,
        proyecto_id,
        tipo_proyecto,
        informe,
      }
    );
    const data = res.data;
    if (data.faltantes) {
      setFaltantes(data.faltantes);
      setLoadingSave(false);
      return;
    }
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
          {faltantes.length > 0 && (
            <Box margin={{ top: "s" }}>
              <Alert
                type="error"
                header="Faltan completar los siguientes apartados"
                dismissible
                onDismiss={() => setFaltantes([])}
              >
                {faltantes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
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
                title: "Descripción de actividades realizadas",
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
                title: "Evaluación global de ejecución académica",
                content: (
                  <Tiptap
                    value={formValues.infinal3}
                    handleChange={handleChange}
                    name="infinal3"
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
                    limitWords={600}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Anexos",
                description:
                  "Medios probatorios de avance (ninguno debe superar los 6 MB)",
                content: (
                  <Container>
                    <FormField
                      label="Adjuntar archivo digital"
                      description={
                        files["informe-PMULTI-INFORME-80"] && (
                          <>
                            Ya ha cargado un{" "}
                            <Link
                              {...propsEnlaces}
                              href={files["informe-PMULTI-INFORME-80"]}
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
                  </Container>
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