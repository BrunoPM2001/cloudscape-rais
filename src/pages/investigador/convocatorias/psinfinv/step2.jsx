import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FormField,
  Input,
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
  palabras_clave_input: { required: true },
  palabras_clave: { required: true },
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
      "investigador/convocatorias/psinfinv/verificar1",
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
    }
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      setLoadingBtn(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/psinfinv/registrar1",
        formValues
      );
      const info = res.data;
      if (info.message == "success") {
        const query = queryString.stringify({
          id: info.id,
        });
        window.location.href = "paso2?" + query;
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
      contentType="wizard"
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
                          id: "resumen",
                          label: "Resumen ejecutivo",
                          content: (
                            <Tiptap
                              value={formValues.resumen_ejecutivo}
                              handleChange={handleChange}
                              name="resumen_ejecutivo"
                              limitWords={10}
                            />
                          ),
                        },
                        {
                          id: "resumen_esperado",
                          label: "Resultado esperado",
                          content: (
                            <Tiptap
                              value={formValues.resumen_esperado}
                              handleChange={handleChange}
                              name="resumen_esperado"
                            />
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
                                    palabra
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
                                    formValues.palabras_clave_input != ""
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
                            <Tiptap
                              value={formValues.antecedentes}
                              handleChange={handleChange}
                              name="antecedentes"
                            />
                          ),
                        },
                        {
                          id: "objetivos_generales",
                          label: "Objetivos generales",
                          content: (
                            <Tiptap
                              value={formValues.objetivos_generales}
                              handleChange={handleChange}
                              name="objetivos_generales"
                            />
                          ),
                        },
                        {
                          id: "objetivos_especificos",
                          label: "Objetivos específicos",
                          content: (
                            <Tiptap
                              value={formValues.objetivos_especificos}
                              handleChange={handleChange}
                              name="objetivos_especificos"
                            />
                          ),
                        },
                        {
                          id: "justificacion",
                          label: "Justificación",
                          content: (
                            <Tiptap
                              value={formValues.justificacion}
                              handleChange={handleChange}
                              name="justificacion"
                            />
                          ),
                        },
                        {
                          id: "hipotesis",
                          label: "Hipótesis",
                          content: (
                            <Tiptap
                              value={formValues.hipotesis}
                              handleChange={handleChange}
                              name="hipotesis"
                            />
                          ),
                        },
                        {
                          id: "metodologia_trabajo",
                          label: "Metodología de trabajo",
                          content: (
                            <Tiptap
                              value={formValues.metodologia_trabajo}
                              handleChange={handleChange}
                              name="metodologia_trabajo"
                            />
                          ),
                        },
                        {
                          id: "referencias_bibliograficas",
                          label: "Referencias bibliográficas",
                          content: (
                            <Tiptap
                              value={formValues.referencias_bibliograficas}
                              handleChange={handleChange}
                              name="referencias_bibliograficas"
                            />
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
