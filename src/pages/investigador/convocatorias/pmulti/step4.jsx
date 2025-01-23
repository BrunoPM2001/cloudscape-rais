import {
  Alert,
  Box,
  Container,
  FileUpload,
  FormField,
  Input,
  Link,
  SpaceBetween,
  Spinner,
  StatusIndicator,
  Tabs,
  TokenGroup,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Tiptap from "../../components/tiptap.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de multidisciplinario",
  },
];

const initialForm = {
  resumen_ejecutivo: "",
  palabras_clave_input: "",
  palabras_clave: [],
  estado_arte: "",
  planteamiento_problema: "",
  justificacion: "",
  contribucion_impacto: "",
  objetivos: "",
  metodologia_trabajo: "",
  referencias_bibliograficas: "",
  file1: [],
  file2: [],
};

const formRules = {
  resumen_ejecutivo: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  estado_arte: { required: true },
  planteamiento_problema: { required: true },
  justificacion: { required: true },
  contribucion_impacto: { required: true },
  objetivos: { required: true },
  metodologia_trabajo: { required: true },
  referencias_bibliograficas: { required: true },
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
  file2: { isFile: true, maxSize: 6 * 1024 * 1024 },
};

const propsRepetidas = {
  showFileLastModified: true,
  showFileSize: true,
  showFileThumbnail: true,
  constraintText:
    "El documento debe estar firmado, en formato PDF y no debe superar los 6 MB",
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

export default function Registro_pmulti_4() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pmulti/verificar4",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    setData(info);
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      if (info.descripcion.length != 0) {
        handleChange("resumen_ejecutivo", info.descripcion.resumen_ejecutivo);
        handleChange("estado_arte", info.descripcion.estado_arte);
        handleChange(
          "planteamiento_problema",
          info.descripcion.planteamiento_problema
        );
        handleChange("justificacion", info.descripcion.justificacion);
        handleChange(
          "contribucion_impacto",
          info.descripcion.contribucion_impacto
        );
        handleChange("objetivos", info.descripcion.objetivos);
        handleChange(
          "metodologia_trabajo",
          info.descripcion.metodologia_trabajo
        );
        handleChange(
          "referencias_bibliograficas",
          info.descripcion.referencias_bibliograficas
        );
        const palabras = info.palabras_clave.split(",");
        handleChange(
          "palabras_clave",
          palabras.map((element) => ({ label: element }))
        );
      }
    }
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    if (index == 4) {
      if (validateForm()) {
        setLoadingBtn(true);
        const form = new FormData();
        form.append("id", id);
        form.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
        form.append("estado_arte", formValues.estado_arte);
        form.append(
          "palabras_clave",
          formValues.palabras_clave.length == 1
            ? formValues.palabras_clave[0].label
            : formValues.palabras_clave.map((item) => item.label).join(",")
        );
        form.append(
          "planteamiento_problema",
          formValues.planteamiento_problema
        );
        form.append("justificacion", formValues.justificacion);
        form.append("contribucion_impacto", formValues.contribucion_impacto);
        form.append("objetivos", formValues.objetivos);
        form.append("metodologia_trabajo", formValues.metodologia_trabajo);
        form.append(
          "referencias_bibliograficas",
          formValues.referencias_bibliograficas
        );
        form.append("file1", formValues.file1[0]);
        form.append("file2", formValues.file2[0]);
        const res = await axiosBase.post(
          "investigador/convocatorias/pmulti/registrar4",
          form
        );
        const info = res.data;
        if (info.message == "success") {
          const query = queryString.stringify({
            id,
          });
          window.location.href = "paso5?" + query;
        } else {
          pushNotification(info.detail, info.message, notifications.length + 1);
        }
        setLoadingBtn(false);
      }
    } else {
      const query = queryString.stringify({
        id,
      });
      window.location.href = "paso" + (index + 1) + "?" + query;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Registro a la convocatoria vigente"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      contentType="table"
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {errors.length == 0 ? (
            <Wizard
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={3}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              steps={[
                {
                  title: "Información general",
                  description: "Información general",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados de GI",
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                  content: (
                    <Tabs
                      tabs={[
                        {
                          id: "resumen_ejecutivo",
                          label: "Resumen ejecutivo",
                          content: (
                            <FormField
                              label="Detalle el resumen"
                              stretch
                              errorText={formErrors.resumen_ejecutivo}
                            >
                              <Tiptap
                                value={formValues.resumen_ejecutivo}
                                handleChange={handleChange}
                                name="resumen_ejecutivo"
                                limitWords={1000}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "palabras_clave",
                          label: "Palabras clave",
                          content: (
                            <FormField
                              label="Palabras clave"
                              description={
                                <StatusIndicator type="warning">
                                  <Box
                                    variant="strong"
                                    color="text-status-warning"
                                    fontSize="body-s"
                                  >
                                    Presionar la tecla de enter para añadir una
                                    palabra, máximo 5 palabras
                                  </Box>
                                </StatusIndicator>
                              }
                              stretch
                              errorText={formErrors.palabras_clave}
                            >
                              <Input
                                placeholder="Escriba las palabras clave"
                                value={formValues.palabras_clave_input}
                                onChange={({ detail }) => {
                                  if (!/.*\s.*/.test(detail.value)) {
                                    handleChange(
                                      "palabras_clave_input",
                                      detail.value
                                    );
                                  }
                                }}
                                onKeyDown={({ detail }) => {
                                  if (
                                    detail.key == "Enter" &&
                                    formValues.palabras_clave_input != "" &&
                                    formValues.palabras_clave.length < 5
                                  ) {
                                    handleChange("palabras_clave", [
                                      ...formValues.palabras_clave,
                                      {
                                        label: formValues.palabras_clave_input,
                                      },
                                    ]);
                                    handleChange("palabras_clave_input", "");
                                  }
                                }}
                              />
                              <TokenGroup
                                items={formValues.palabras_clave}
                                onDismiss={({ detail: { itemIndex } }) => {
                                  handleChange("palabras_clave", [
                                    ...formValues.palabras_clave.slice(
                                      0,
                                      itemIndex
                                    ),
                                    ...formValues.palabras_clave.slice(
                                      itemIndex + 1
                                    ),
                                  ]);
                                }}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "estado_arte",
                          label: "Estado del arte",
                          content: (
                            <SpaceBetween size="m">
                              <FormField
                                label="Relevancia y actualización de los antecedentes en relación con el problema planteado, asegurándose de que reflejen los últimos avances en el área. Claridad y precisión en la conceptualización del problema de investigación, evidenciando comprensión profunda y contextualización adecuada"
                                stretch
                                errorText={formErrors.estado_arte}
                              >
                                <Tiptap
                                  value={formValues.estado_arte}
                                  handleChange={handleChange}
                                  name="estado_arte"
                                  limitWords={2000}
                                />
                              </FormField>
                              <Container>
                                <FormField
                                  label="Anexo"
                                  description={
                                    data.archivos.estado_arte != null && (
                                      <>
                                        Ya ha cargado un{" "}
                                        <Link
                                          href={data.archivos.estado_arte}
                                          external="true"
                                          variant="primary"
                                          fontSize="body-s"
                                          target="_blank"
                                        >
                                          archivo.
                                        </Link>
                                      </>
                                    )
                                  }
                                  errorText={formErrors.file1}
                                >
                                  <FileUpload
                                    {...propsRepetidas}
                                    value={formValues.file1}
                                    onChange={({ detail }) =>
                                      handleChange("file1", detail.value)
                                    }
                                  />
                                </FormField>
                              </Container>
                            </SpaceBetween>
                          ),
                        },
                        {
                          id: "planteamiento_problema",
                          label: "Planteamiento del problema",
                          content: (
                            <FormField
                              label="Presentación clara del problema, con una definición precisa y una demostración de su importancia para la investigación multidisciplinaria actual."
                              stretch
                              errorText={formErrors.planteamiento_problema}
                            >
                              <Tiptap
                                value={formValues.planteamiento_problema}
                                handleChange={handleChange}
                                name="planteamiento_problema"
                                limitWords={2000}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "justificacion",
                          label: "Justificación",
                          content: (
                            <FormField
                              label="Justificación sólida que conecte el proyecto con los programas y líneas de investigación de la UNMSM, su relevancia para la región y el país, y su contribución a los Objetivos de Desarrollo Sostenible."
                              stretch
                              errorText={formErrors.justificacion}
                            >
                              <Tiptap
                                value={formValues.justificacion}
                                handleChange={handleChange}
                                name="justificacion"
                                limitWords={2000}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "contribucion_impacto",
                          label: "Contribución e impacto",
                          content: (
                            <FormField
                              label="Evaluación del potencial de la investigación para aportar soluciones a problemas significativos y su capacidad para avanzar en el conocimiento científico y tecnológico"
                              stretch
                              errorText={formErrors.contribucion_impacto}
                            >
                              <Tiptap
                                value={formValues.contribucion_impacto}
                                handleChange={handleChange}
                                name="contribucion_impacto"
                                limitWords={1500}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "objetivos",
                          label: "Objetivos",
                          content: (
                            <FormField
                              label="Definición clara del objetivo general y cómo los objetivos específicos contribuyen al logro del mismo y al avance de la investigación multidisciplinaria"
                              stretch
                              errorText={formErrors.objetivos}
                            >
                              <Tiptap
                                value={formValues.objetivos}
                                handleChange={handleChange}
                                name="objetivos"
                                limitWords={1500}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "metodologia_trabajo",
                          label: "Metodología de trabajo",
                          content: (
                            <SpaceBetween size="m">
                              <FormField
                                label="Diseño de la investigación, método y técnicas a ser utilizadas, etapas del estudio"
                                stretch
                                errorText={formErrors.metodologia_trabajo}
                              >
                                <Tiptap
                                  value={formValues.metodologia_trabajo}
                                  handleChange={handleChange}
                                  name="metodologia_trabajo"
                                  limitWords={1500}
                                />
                              </FormField>
                              <Container>
                                <FormField
                                  label="Anexo"
                                  description={
                                    data.archivos.metodologia != null && (
                                      <>
                                        Ya ha cargado un{" "}
                                        <Link
                                          href={data.archivos.metodologia}
                                          external="true"
                                          variant="primary"
                                          fontSize="body-s"
                                          target="_blank"
                                        >
                                          archivo.
                                        </Link>
                                      </>
                                    )
                                  }
                                  errorText={formErrors.file2}
                                >
                                  <FileUpload
                                    {...propsRepetidas}
                                    value={formValues.file2}
                                    onChange={({ detail }) =>
                                      handleChange("file2", detail.value)
                                    }
                                  />
                                </FormField>
                              </Container>
                            </SpaceBetween>
                          ),
                        },
                        {
                          id: "referencias_bibliograficas",
                          label: "Referencias bibliográficas",
                          content: (
                            <FormField
                              label="Ordenadas en función a algún sistema internacionalmente reconocido como: Vancouver, APA o Council of Science Editors (CSE)"
                              stretch
                              errorText={formErrors.referencias_bibliograficas}
                            >
                              <Tiptap
                                value={formValues.referencias_bibliograficas}
                                handleChange={handleChange}
                                name="referencias_bibliograficas"
                                limitWords={1500}
                              />
                            </FormField>
                          ),
                        },
                      ]}
                    />
                  ),
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Colaboración externa",
                  description:
                    "Documento de compromiso del Cooperante Internacional",
                },
                {
                  title: "Instrucciones finales",
                  description: "Reporte y envío de la propuesta",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede registrarse en esta convocatoria"
                type="warning"
              >
                {errors.map((item) => {
                  return <li>{item}</li>;
                })}
              </Alert>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
}
