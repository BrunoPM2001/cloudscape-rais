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
  Modal,
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
import { useCollection } from "@cloudscape-design/collection-hooks";
import ModalCargarActividad from "./modalCargarActividad";

const initialForm = {
  id: null,
  estado: 0,
  resumen_ejecutivo: "",
  palabras_clave: "",
  infinal1: "",
  infinal2: "",
  infinal3: "",
  infinal4: "",
  infinal5: "",
  infinal6: "",
  infinal7: "",
  infinal9: "",
  infinal10: "",
  file1: [],
  file2: [],
  file3: [],
  file4: [],
  file5: [],
  file6: [],
  file7: [],
  file8: [],
  file9: [],
  file10: [],
  file11: [],
  file12: [],
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
        },
      }
    );
    const data = res.data;
    setProyecto(data.proyecto);
    setMiembros(data.miembros);
    setFiles(data.archivos);
    setActividades(data.actividades);
    if (data.informe) {
      handleChange("resumen_ejecutivo", data.informe.resumen_ejecutivo ?? "");
      handleChange("palabras_clave", data.informe.palabras_clave ?? "");
      handleChange("infinal1", data.informe.infinal1 ?? "");
      handleChange("infinal2", data.informe.infinal2 ?? "");
      handleChange("infinal3", data.informe.infinal3 ?? "");
      handleChange("infinal4", data.informe.infinal4 ?? "");
      handleChange("infinal5", data.informe.infinal5 ?? "");
      handleChange("infinal6", data.informe.infinal6 ?? "");
      handleChange("infinal7", data.informe.infinal7 ?? "");
      handleChange("infinal9", data.informe.infinal9 ?? "");
      handleChange("infinal10", data.informe.infinal10 ?? "");
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
    form.append("palabras_clave", formValues.palabras_clave);
    form.append("infinal1", formValues.infinal1);
    form.append("infinal2", formValues.infinal2);
    form.append("infinal3", formValues.infinal3);
    form.append("infinal4", formValues.infinal4);
    form.append("infinal5", formValues.infinal5);
    form.append("infinal6", formValues.infinal6);
    form.append("infinal7", formValues.infinal7);
    form.append("infinal9", formValues.infinal9);
    form.append("infinal10", formValues.infinal10);
    form.append("file1", formValues.file1[0]);
    form.append("file2", formValues.file2[0]);
    form.append("file3", formValues.file3[0]);
    form.append("file4", formValues.file4[0]);
    form.append("file5", formValues.file5[0]);
    form.append("file6", formValues.file6[0]);
    form.append("file7", formValues.file7[0]);
    form.append("file8", formValues.file8[0]);
    form.append("file9", formValues.file9[0]);
    form.append("file10", formValues.file10[0]);
    form.append("file11", formValues.file11[0]);
    form.append("file12", formValues.file12[0]);
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
                            <Box>{proyecto.resolucion}</Box>
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
                title: "Resumen",
                description:
                  "Breve descripción del estudio, en no más de 200 palabras",
                content: (
                  <Tiptap
                    value={formValues.resumen_ejecutivo}
                    handleChange={handleChange}
                    name="resumen_ejecutivo"
                    limitWords={200}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Palabras clave",
                description: "Sepárelas por comas",
                content: (
                  <FormField label="Palabras clave" stretch>
                    <Input
                      value={formValues.palabras_clave}
                      onChange={({ detail }) =>
                        handleChange("palabras_clave", detail.value)
                      }
                    />
                  </FormField>
                ),
                isOptional: true,
              },
              {
                title: "Introducción",
                description:
                  "Importancia de los resultados de la investigación",
                content: (
                  <Tiptap
                    value={formValues.infinal1}
                    handleChange={handleChange}
                    name="infinal1"
                    limitWords={600}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Metodologías",
                description:
                  "Metodología y técnicas de investigación utilizadas",
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
                title: "Resultados",
                description:
                  "Capítulos, títulos, subtítulos, tablas, gráficos según corresponda",
                content: (
                  <Tiptap
                    value={formValues.infinal3}
                    handleChange={handleChange}
                    name="infinal3"
                    limitWords={2000}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Discusión",
                content: (
                  <Tiptap
                    value={formValues.infinal4}
                    handleChange={handleChange}
                    name="infinal4"
                    limitWords={600}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Conclusiones",
                content: (
                  <Tiptap
                    value={formValues.infinal5}
                    handleChange={handleChange}
                    name="infinal5"
                    limitWords={600}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Recomendaciones",
                content: (
                  <Tiptap
                    value={formValues.infinal6}
                    handleChange={handleChange}
                    name="infinal6"
                    limitWords={2000}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Referencias bibliográficas",
                content: (
                  <Tiptap
                    value={formValues.infinal7}
                    handleChange={handleChange}
                    name="infinal7"
                    limitWords={2000}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Anexos",
                description:
                  "Archivos adjuntos (ninguno debe superar los 6 MB)",
                content: (
                  <Container>
                    <FormField
                      label="Adjuntar archivo digital"
                      description={
                        files["informe-PINTERDIS-INFORME"] && (
                          <>
                            Ya ha cargado un{" "}
                            <Link
                              {...propsEnlaces}
                              href={files["informe-PINTERDIS-INFORME"]}
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
              {
                title: "Aplicación práctica e impacto",
                content: (
                  <Tiptap
                    value={formValues.infinal9}
                    handleChange={handleChange}
                    name="infinal9"
                    limitWords={2000}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Publicación",
                content: (
                  <Tiptap
                    value={formValues.infinal10}
                    handleChange={handleChange}
                    name="infinal10"
                    limitWords={2000}
                  />
                ),
                isOptional: true,
              },
              {
                title: "Calendario de actividades",
                content: (
                  <Table
                    {...collectionProps}
                    trackBy="id"
                    items={items}
                    columnDefinitions={columnDefinitions}
                    columnDisplay={columnDisplay}
                    wrapLines
                    selectionType="single"
                    onRowClick={({ detail }) =>
                      actions.setSelectedItems([detail.item])
                    }
                    header={
                      <Header
                        counter={"(" + actividades.length + ")"}
                        actions={
                          <ButtonDropdown
                            disabled={
                              collectionProps.selectedItems.length > 0
                                ? false
                                : true
                            }
                            variant="normal"
                            onItemClick={({ detail }) => {
                              if (detail.id == "action_1_1") {
                                setModal("cargar");
                              } else if (detail.id == "action_1_2") {
                                window.open(
                                  files[
                                    "actividad" +
                                      collectionProps.selectedItems[0]?.indice
                                  ],
                                  "_blank"
                                );
                              }
                            }}
                            items={[
                              {
                                text: "Cargar archivo",
                                id: "action_1_1",
                              },
                              {
                                text: "Ver archivo cargado",
                                id: "action_1_2",
                                disabled:
                                  !files[
                                    "actividad" +
                                      collectionProps.selectedItems[0]?.indice
                                  ],
                              },
                            ]}
                          >
                            Acciones
                          </ButtonDropdown>
                        }
                      >
                        Actividades
                      </Header>
                    }
                    empty={
                      <Box
                        margin={{ vertical: "xs" }}
                        textAlign="center"
                        color="inherit"
                      >
                        <SpaceBetween size="m">
                          <b>No hay registros...</b>
                        </SpaceBetween>
                      </Box>
                    }
                  />
                ),
                isOptional: true,
              },
              {
                title: "Entregables",
                content: (
                  <SpaceBetween size="l">
                    <Container
                      header={
                        <Box variant="h4">
                          Dos (02) artículos publicados o aceptados en revistas
                          indizadas a SCOPUS O WoS,o un libro,o dos(02)
                          capítulos de libro publicados en editoriales
                          reconocido prestigio, de acuerdo con las normas
                          internas de la universidad.
                        </Box>
                      }
                    >
                      <ColumnLayout columns={2}>
                        <FormField
                          label="Primer artículo"
                          stretch
                          description={
                            files["articulo1"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["articulo1"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
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
                          label="Segundo artículo"
                          stretch
                          description={
                            files["articulo2"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["articulo2"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file3}
                            onChange={({ detail }) => {
                              handleChange("file3", detail.value);
                            }}
                          />
                        </FormField>
                      </ColumnLayout>
                    </Container>
                    <Container
                      header={
                        <Box variant="h4">
                          Cuatro (04) tesis sustentadas, siendo tres(03) de
                          ellas de pregrado y la una(01) de posgrado.En el caso
                          de las tesis realizadas por estudiante(s) de la(s)
                          universidad(es) colaboradora(s) el asesor presenta el
                          acta de sustentación al responsable del proyecto.
                        </Box>
                      }
                    >
                      <ColumnLayout columns={2}>
                        <FormField
                          label="Primera tesis de pregrado"
                          stretch
                          description={
                            files["tesis1"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link {...propsEnlaces} href={files["tesis1"]}>
                                  archivo.
                                </Link>
                              </>
                            )
                          }
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
                          label="Segunda tesis de pregrado"
                          stretch
                          description={
                            files["tesis2"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link {...propsEnlaces} href={files["tesis2"]}>
                                  archivo.
                                </Link>
                              </>
                            )
                          }
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
                          label="Tercera tesis de pregrado"
                          stretch
                          description={
                            files["tesis3"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link {...propsEnlaces} href={files["tesis3"]}>
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file6}
                            onChange={({ detail }) => {
                              handleChange("file6", detail.value);
                            }}
                          />
                        </FormField>
                        <FormField
                          label="Primera tesis de posgrado"
                          stretch
                          description={
                            files["tesis4"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link {...propsEnlaces} href={files["tesis4"]}>
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file7}
                            onChange={({ detail }) => {
                              handleChange("file7", detail.value);
                            }}
                          />
                        </FormField>
                      </ColumnLayout>
                    </Container>
                    <Container
                      header={
                        <Box variant="h4">
                          Cuatro (04) trabajos de investigación para obtener el
                          grado de bachiller.
                        </Box>
                      }
                    >
                      <ColumnLayout columns={2}>
                        <FormField
                          label="Primera investigación"
                          stretch
                          description={
                            files["investigacion1"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["investigacion1"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file8}
                            onChange={({ detail }) => {
                              handleChange("file8", detail.value);
                            }}
                          />
                        </FormField>
                        <FormField
                          label="Segunda investigación"
                          stretch
                          description={
                            files["investigacion2"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["investigacion2"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file9}
                            onChange={({ detail }) => {
                              handleChange("file9", detail.value);
                            }}
                          />
                        </FormField>
                        <FormField
                          label="Tercera investigación"
                          stretch
                          description={
                            files["investigacion3"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["investigacion3"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file10}
                            onChange={({ detail }) => {
                              handleChange("file10", detail.value);
                            }}
                          />
                        </FormField>
                        <FormField
                          label="Cuarta investigación"
                          stretch
                          description={
                            files["investigacion4"] && (
                              <>
                                Ya ha cargado un{" "}
                                <Link
                                  {...propsEnlaces}
                                  href={files["investigacion4"]}
                                >
                                  archivo.
                                </Link>
                              </>
                            )
                          }
                        >
                          <FileUpload
                            {...propsRepetidas}
                            value={formValues.file11}
                            onChange={({ detail }) => {
                              handleChange("file11", detail.value);
                            }}
                          />
                        </FormField>
                      </ColumnLayout>
                    </Container>
                    <Container
                      header={
                        <Box variant="h4">
                          La formación de una red científica o el registro y/o
                          inscripción al menos de una (01) solicitud de
                          protección de propiedad intelectual y de transferencia
                          tecnólogica según la naturaleza del proyecto.
                        </Box>
                      }
                    >
                      <FormField
                        label="Archivo"
                        stretch
                        description={
                          files["registro"] && (
                            <>
                              Ya ha cargado un{" "}
                              <Link {...propsEnlaces} href={files["registro"]}>
                                archivo.
                              </Link>
                            </>
                          )
                        }
                      >
                        <FileUpload
                          {...propsRepetidas}
                          value={formValues.file12}
                          onChange={({ detail }) => {
                            handleChange("file12", detail.value);
                          }}
                        />
                      </FormField>
                    </Container>
                  </SpaceBetween>
                ),
                isOptional: true,
              },
              //  TODO - Implementar las últimas secciones (flojera)
            ]}
          />
        </SpaceBetween>
      )}
      {modal == "cargar" && (
        <ModalCargarActividad
          proyecto_id={proyecto_id}
          indice={collectionProps.selectedItems[0]?.indice}
          close={() => setModal("")}
          reload={getData}
        />
      )}
    </>
  );
};
