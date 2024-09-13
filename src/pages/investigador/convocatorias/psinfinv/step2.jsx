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
    text: "Proyecto de investigación sin financiamiento",
  },
];

const initialForm = {
  resumen_ejecutivo: "",
  resumen_esperado: "",
  palabras_clave_input: "",
  palabras_clave: [],
  antecedentes: "",
  objetivos_generales: "",
  objetivos_especificos: "",
  justificacion: "",
  hipotesis: "",
  metodologia_trabajo: "",
  referencias_bibliograficas: "",
  file1: [],
  file2: [],
};

const formRules = {
  resumen_ejecutivo: { required: true, limitWords: 200 },
  resumen_esperado: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  antecedentes: { required: true },
  objetivos_generales: { required: true },
  objetivos_especificos: { required: true },
  justificacion: { required: true },
  hipotesis: { required: true },
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

export default function Registro_psinfinv_2() {
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
      "investigador/convocatorias/psinfinv/verificar2",
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
        handleChange("resumen_esperado", info.descripcion.resumen_esperado);
        handleChange("antecedentes", info.descripcion.antecedentes);
        handleChange(
          "objetivos_generales",
          info.descripcion.objetivos_generales
        );
        handleChange(
          "objetivos_especificos",
          info.descripcion.objetivos_especificos
        );
        handleChange("justificacion", info.descripcion.justificacion);
        handleChange("hipotesis", info.descripcion.hipotesis);
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

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const form = new FormData();
      form.append("id", id);
      form.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
      form.append("resumen_esperado", formValues.resumen_esperado);
      form.append(
        "palabras_clave",
        formValues.palabras_clave.length == 1
          ? formValues.palabras_clave[0].label
          : formValues.palabras_clave.map((item) => item.label).join(",")
      );
      form.append("antecedentes", formValues.antecedentes);
      form.append("objetivos_generales", formValues.objetivos_generales);
      form.append("objetivos_especificos", formValues.objetivos_especificos);
      form.append("justificacion", formValues.justificacion);
      form.append("hipotesis", formValues.hipotesis);
      form.append("metodologia_trabajo", formValues.metodologia_trabajo);
      form.append(
        "referencias_bibliograficas",
        formValues.referencias_bibliograficas
      );
      form.append("file1", formValues.file1[0]);
      form.append("file2", formValues.file2[0]);
      const res = await axiosBase.post(
        "investigador/convocatorias/psinfinv/registrar2",
        form
      );
      const info = res.data;
      if (info.message == "success") {
        const query = queryString.stringify({
          id,
        });
        window.location.href = "paso3?" + query;
      } else {
        pushNotification(info.detail, info.message, notifications.length + 1);
      }
      setLoadingBtn(false);
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
              onNavigate={siguiente}
              activeStepIndex={1}
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
                                limitWords={200}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "resumen_esperado",
                          label: "Resultado esperado",
                          content: (
                            <FormField
                              label="Detalle los resultados que espera conseguir"
                              stretch
                              errorText={formErrors.resumen_esperado}
                            >
                              <Tiptap
                                value={formValues.resumen_esperado}
                                handleChange={handleChange}
                                name="resumen_esperado"
                                limitWords={300}
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
                                  handleChange(
                                    "palabras_clave_input",
                                    detail.value
                                  );
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
                          id: "antecedentes",
                          label: "Antecedentes",
                          content: (
                            <FormField
                              label="Indique los antecedentes del proyecto"
                              stretch
                              errorText={formErrors.antecedentes}
                            >
                              <Tiptap
                                value={formValues.antecedentes}
                                handleChange={handleChange}
                                name="antecedentes"
                                limitWords={1000}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "objetivos_generales",
                          label: "Objetivo general",
                          content: (
                            <FormField
                              label="Indique el objetivo general que espera alcanzar"
                              stretch
                              errorText={formErrors.objetivos_generales}
                            >
                              <Tiptap
                                value={formValues.objetivos_generales}
                                handleChange={handleChange}
                                name="objetivos_generales"
                                limitWords={200}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "objetivos_especificos",
                          label: "Objetivos específicos",
                          content: (
                            <FormField
                              label="Indique el objetivo general que espera alcanzar"
                              stretch
                              errorText={formErrors.objetivos_especificos}
                            >
                              <Tiptap
                                value={formValues.objetivos_especificos}
                                handleChange={handleChange}
                                name="objetivos_especificos"
                                limitWords={200}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "justificacion",
                          label: "Justificación",
                          content: (
                            <FormField
                              label="Definir las razones del por qué se aborda la investigación y el aporte de los resultados para el beneficio de la sociedad, desarrollo científico ó tecnológico."
                              stretch
                              errorText={formErrors.justificacion}
                            >
                              <Tiptap
                                value={formValues.justificacion}
                                handleChange={handleChange}
                                name="justificacion"
                                limitWords={400}
                              />
                            </FormField>
                          ),
                        },
                        {
                          id: "hipotesis",
                          label: "Hipótesis",
                          content: (
                            <FormField
                              label="Clara y coherente con el problema central."
                              stretch
                              errorText={formErrors.hipotesis}
                            >
                              <Tiptap
                                value={formValues.hipotesis}
                                handleChange={handleChange}
                                name="hipotesis"
                                limitWords={200}
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
                        {
                          id: "propiedad_intelectual",
                          label: "Propiedad intelectual",
                          content: (
                            <Container>
                              <FormField
                                label="Propiedad intelectual"
                                description={
                                  <>
                                    Puede descargar la plantilla en{" "}
                                    <Link
                                      href="/minio/templates/propiedad-intelectual.docx"
                                      external="true"
                                      variant="primary"
                                      fontSize="body-s"
                                      target="_blank"
                                    >
                                      este enlace.
                                    </Link>
                                    {data.archivos.propiedad != null && (
                                      <>
                                        {" "}
                                        Ya ha cargado un{" "}
                                        <Link
                                          href={data.archivos.propiedad}
                                          external="true"
                                          variant="primary"
                                          fontSize="body-s"
                                          target="_blank"
                                        >
                                          archivo.
                                        </Link>
                                      </>
                                    )}
                                  </>
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
                          ),
                        },
                      ]}
                    />
                  ),
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                },
                {
                  title: "Programa del taller",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Financiamiento",
                  description: "Montos y partidas",
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
