import {
  Alert,
  Box,
  Container,
  FileUpload,
  FormField,
  Input,
  Link,
  Select,
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
    text: "Proyecto pconfigi innova",
  },
];

const initialForm = {
  resumen_ejecutivo: "",
  palabras_clave_input: "",
  palabras_clave: [],
  antecedentes: "",
  justificacion: "",
  pintelectual: null,
  contribucion_impacto: "",
  hipotesis: "",
  objetivos: "",
  metodologia_trabajo: "",
  calidad_viabilidad: "",
  referencias_bibliograficas: "",
  file: [],
};

const formRules = {
  resumen_ejecutivo: { required: true },
  palabras_clave: { required: true, noEmpty: true },
  antecedentes: { required: true },
  justificacion: { required: true },
  pintelectual: { required: true },
  contribucion_impacto: { required: true },
  hipotesis: { required: true },
  objetivos: { required: true },
  metodologia_trabajo: { required: true },
  calidad_viabilidad: { required: true },
  referencias_bibliograficas: { required: true },
  file: { required: false, isFile: true, maxSize: 6 * 1024 * 1024 },
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

const opt_pintelectual = [
  { value: "Patentes de invención" },
  { value: "Modelos de utilidad" },
  { value: "Certificados de obtentor" },
  { value: "Otros" },
];

export default function Registro_pconfigi_inv_3() {
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
      "investigador/convocatorias/pconfigi_inv/verificar3",
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
          "pintelectual",
          opt_pintelectual.find(
            (opt) => opt.value == info.descripcion.pintelectual
          )
        );
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
        handleChange("calidad_viabilidad", info.descripcion.calidad_viabilidad);
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
      if (validateForm()) {
        setLoadingBtn(true);
        const form = new FormData();
        form.append("id", id);
        form.append("resumen_ejecutivo", formValues.resumen_ejecutivo);
        form.append("antecedentes", formValues.antecedentes);
        form.append(
          "palabras_clave",
          formValues.palabras_clave.length == 1
            ? formValues.palabras_clave[0].label
            : formValues.palabras_clave.map((item) => item.label).join(",")
        );
        form.append("justificacion", formValues.justificacion);
        form.append("pintelectual", formValues.pintelectual.value);
        form.append("contribucion_impacto", formValues.contribucion_impacto);
        form.append("hipotesis", formValues.hipotesis);
        form.append("objetivos", formValues.objetivos);
        form.append("metodologia_trabajo", formValues.metodologia_trabajo);
        form.append("calidad_viabilidad", formValues.calidad_viabilidad);
        form.append(
          "referencias_bibliograficas",
          formValues.referencias_bibliograficas
        );
        form.append("file", formValues.file[0]);
        const res = await axiosBase.post(
          "investigador/convocatorias/pconfigi_inv/registrar3",
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
                  title: "Carta de vinculación",
                  description: "Documento cargado por el responsable",
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
                              label="Enfocar en identificar y analizar brechas específicas que la innovación propuesta pretende llenar, y cómo esta se diferencia o mejora lo que actualmente existe en el campo"
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
                              label="Resaltar la urgencia y necesidad de la innovación para el avance científico, tecnológico, económico o social y su alineación con las tendencias de vanguardia en la industria o la academia."
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
                            <SpaceBetween>
                              <FormField
                                label="Evaluación del potencial de la investigación para aportar soluciones a problemas significativos y su capacidad para avanzar en el conocimiento científico y tecnológico"
                                stretch
                                errorText={formErrors.contribucion_impacto}
                              >
                                <Select
                                  placeholder="Escoja una opción"
                                  selectedOption={formValues.pintelectual}
                                  onChange={({ detail }) =>
                                    handleChange(
                                      "pintelectual",
                                      detail.selectedOption
                                    )
                                  }
                                  options={opt_pintelectual}
                                />
                              </FormField>
                              <FormField
                                label="Evaluación del potencial de la investigación para aportar soluciones a problemas significativos y su capacidad para avanzar en el conocimiento científico y tecnológico"
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
                            </SpaceBetween>
                          ),
                        },
                        {
                          id: "hipotesis",
                          label: "Hipótesis",
                          content: (
                            <FormField
                              label="Formular hipótesis que se centren en la capacidad de la innovación para superar desafíos actuales y proporcionar soluciones tangibles y verificables a través de la implementación de la tecnología"
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
                              label="Delimitar objetivos que reflejen un proceso innovador claro, donde cada objetivo específico representa un paso concreto hacia el desarrollo y la aplicación de la innovación, asegurando que cada fase sea novedosa y aporte valor agregado al proyecto."
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
                                label="Detallar un enfoque sistemático que demuestre cómo cada método y técnica seleccionados contribuirán a lograr los objetivos del proyecto. La metodología propuesta debe reflejar un entendimiento profundo del área de innovación, incorporar prácticas de investigación sólidas y estar alineada con las últimas tendencias en el campo"
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
                                  errorText={formErrors.file}
                                >
                                  <FileUpload
                                    {...propsRepetidas}
                                    value={formValues.file}
                                    onChange={({ detail }) =>
                                      handleChange("file", detail.value)
                                    }
                                  />
                                </FormField>
                              </Container>
                            </SpaceBetween>
                          ),
                        },
                        {
                          id: "calidad_viabilidad",
                          label: "Calidad y viabilidad",
                          content: (
                            <FormField
                              label="Se debe demostrar que la innovación es original y factible. Esto involucra evaluar si la tecnología puede desarrollarse y utilizarse efectivamente en un contexto real y si existen los recursos necesarios para llevarla a cabo hasta su plena operación."
                              stretch
                              errorText={formErrors.calidad_viabilidad}
                            >
                              <Tiptap
                                value={formValues.calidad_viabilidad}
                                handleChange={handleChange}
                                name="calidad_viabilidad"
                                limitWords={1500}
                              />
                            </FormField>
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
                  title: "Integrantes",
                  description: "Deben ser integrantes registrados de GI",
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
