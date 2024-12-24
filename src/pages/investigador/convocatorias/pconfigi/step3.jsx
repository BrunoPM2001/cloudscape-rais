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
    text: "Proyecto de investigación con financiamiento",
  },
];

const initialForm = {
  resumen_ejecutivo: "",
  palabras_clave_input: "",
  palabras_clave: [],
  antecedentes: "",
  justificacion: "",
  contribucion_impacto: "",
  hipotesis: "",
  objetivos: "",
  metodologia_trabajo: "",
  referencias_bibliograficas: "",
  file1: [],
};

const campoNombres = {
  resumen_ejecutivo: "Resumen Ejecutivo",
  antecedentes: "Antecedentes",
  justificacion: "Justificación",
  contribucion_impacto: "Contribución e Impacto",
  hipotesis: "Hipótesis",
  objetivos: "Objetivos",
  metodologia_trabajo: "Metodología de Trabajo",
  referencias_bibliograficas: "Referencias Bibliográficas",
};

const formRules = {
  resumen_ejecutivo: { required: true, noEmptyHtml: true },
  palabras_clave: { required: true, noEmpty: true },
  antecedentes: { required: true },
  justificacion: { required: true },
  contribucion_impacto: { required: true },
  hipotesis: { required: true },
  objetivos: { required: true },
  metodologia_trabajo: { required: true },
  referencias_bibliograficas: { required: true },
  file1: { isFile: true, maxSize: 6 * 1024 * 1024 },
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

export default function Registro_pconfigi_3() {
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
  const [errores, setErrores] = useState([]);
  const [alertVisible, setAlertVisible] = useState(true);
  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";

  };

  const validateCampos = () => {
    const errores = [];

    // Validar cada campo utilizando stripHTML y añadiendo nombres legibles
    if (!stripHTML(formValues.resumen_ejecutivo).trim()) errores.push(campoNombres.resumen_ejecutivo);
    if (!stripHTML(formValues.antecedentes).trim()) errores.push(campoNombres.antecedentes);
    if (!stripHTML(formValues.justificacion).trim()) errores.push(campoNombres.justificacion);
    if (!stripHTML(formValues.contribucion_impacto).trim()) errores.push(campoNombres.contribucion_impacto);
    if (!stripHTML(formValues.hipotesis).trim()) errores.push(campoNombres.hipotesis);
    if (!stripHTML(formValues.objetivos).trim()) errores.push(campoNombres.objetivos);
    if (!stripHTML(formValues.metodologia_trabajo).trim()) errores.push(campoNombres.metodologia_trabajo);
    if (!stripHTML(formValues.referencias_bibliograficas).trim()) errores.push(campoNombres.referencias_bibliograficas);

    return errores;
  };



  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi/verificar3",
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
        handleChange("antecedentes", info.descripcion.antecedentes);
        handleChange("justificacion", info.descripcion.justificacion);
        handleChange(
          "contribucion_impacto",
          info.descripcion.contribucion_impacto
        );
        handleChange("hipotesis", info.descripcion.hipotesis);
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
    if (index == 3) {

      const errores = validateCampos();
      if (errores.length > 0) {
        console.error("Campos vacíos:", errores); // Mostrar errores en consola 
        setErrores(errores); // Guardar errores en el estado para mostrarlos en la interfaz
        setAlertVisible(true);
        return; // Detener la navegación
      }

      if (validateForm()) {
        setLoadingBtn(true);

        const form = new FormData();
        form.append("id", id);
        form.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
        form.append(
          "palabras_clave",
          formValues.palabras_clave.length == 1
            ? formValues.palabras_clave[0].label
            : formValues.palabras_clave.map((item) => item.label).join(",")
        );
        form.append("antecedentes", formValues.antecedentes);
        form.append("justificacion", formValues.justificacion);
        form.append("contribucion_impacto", formValues.contribucion_impacto);
        form.append("hipotesis", formValues.hipotesis);
        form.append("objetivos", formValues.objetivos);
        form.append("metodologia_trabajo", formValues.metodologia_trabajo);
        form.append(
          "referencias_bibliograficas",
          formValues.referencias_bibliograficas
        );
        form.append("file1", formValues.file1[0]);
        const res = await axiosBase.post(
          "investigador/convocatorias/pconfigi/registrar3",
          form
        );
        const info = res.data;
        if (info.message == "success") {
          const query = queryString.stringify({
            id,
          });
          window.location.href = "paso4?" + query;
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
      contentType="wizzard"
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
              activeStepIndex={2}
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
                  title: "Colaboración externa",
                  description:
                    "Documento que acredita financiamiento y/o asistencia técnica externa para el desarrollo del proyecto",
                },
                {
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                  content: (
                    <>
                      {errores.length > 0 && alertVisible && (
                        <Alert
                        style={{ paddingTop: "16px", paddingBottom: "16px" }}
                        onDismiss={() => setAlertVisible(false)}
                          dismissible
                          statusIconAriaLabel="Error"
                          type="error"
                          header="Por favor Completar los campos requeridos"
                        >
                          <ul>
                            {errores.map((campo, index) => (
                              <li key={index}>{campo}</li>
                            ))}
                          </ul>
                        </Alert>
                      )}
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
                            id: "justificacion",
                            label: "Justificación",
                            content: (
                              <FormField
                                label="Definir las razones del por qué se aborda la investigación y el aporte de los resultados para el beneficio de la sociedad, desarrollo científico ó tecnológico"
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
                            id: "contribucion_impacto",
                            label: "Contribución e impacto",
                            content: (
                              <FormField
                                label="Aporte científico que se espera obtener de la aplicación de los resultados de la investigación"
                                stretch
                                errorText={formErrors.contribucion_impacto}
                              >
                                <Tiptap
                                  value={formValues.contribucion_impacto}
                                  handleChange={handleChange}
                                  name="contribucion_impacto"
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
                                label="Clara y coherente con el problema central"
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
                            id: "objetivos",
                            label: "Objetivos",
                            content: (
                              <FormField
                                label="Indique el objetivo general y los específicos que espera alcanzar"
                                stretch
                                errorText={formErrors.objetivos}
                              >
                                <Tiptap
                                  value={formValues.objetivos}
                                  handleChange={handleChange}
                                  name="objetivos"
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
                        ]}
                      />
                    </>
                  ),
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados del GI",
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
