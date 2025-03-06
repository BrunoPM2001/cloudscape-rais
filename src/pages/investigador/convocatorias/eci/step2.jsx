import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FileUpload,
  FormField,
  Input,
  Link,
  Select,
  SpaceBetween,
  Spinner,
  Textarea,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import NotificationContext from "../../../../providers/notificationProvider.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Proyecto de equipamiento científico",
  },
];

const initialForm = {
  titulo: "",
  linea: null,
  resumen: "",
  justificacion: "",
  propuesta: "",
};

const formRules = {
  titulo: { required: true },
  linea: { required: true },
  resumen: { required: true, limitWords: 200 },
  justificacion: { required: true, limitWords: 200 },
  propuesta: { required: true, limitWords: 200 },
};

export default function Registro_eci_2() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [options, setOptions] = useState([]);

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/eci/verificar2",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    if (!info.estado) {
      setErrors(info.errores);
    } else {
      setOptions(info.data.lineas);
      handleChange("titulo", info.data.titulo);
      handleChange(
        "linea",
        info.data.lineas.find(
          (opt) => opt.value == info.data.linea_investigacion_id
        )
      );
      handleChange("resumen", info.data.descripcion?.resumen);
      handleChange("justificacion", info.data.descripcion?.justificacion);
      handleChange("propuesta", info.data.descripcion?.propuesta);
    }
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    const query = queryString.stringify({
      id,
    });
    if (index == 2) {
      if (validateForm()) {
        setLoadingForm(true);
        const res = await axiosBase.post(
          "investigador/convocatorias/eci/registrar2",
          {
            ...formValues,
            linea: formValues.linea.value,
            id,
          }
        );
        const data = res.data;
        pushNotification(data.detail, data.message, notifications.length + 1);
        if (data.message == "success") {
          window.location.href = "paso" + (index + 1) + "?" + query;
        }
        setLoadingForm(false);
      }
    } else {
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
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={1}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              isLoadingNextStep={loadingForm}
              steps={[
                {
                  title: "Información del grupo de investigación",
                  description: "Información general",
                },
                {
                  title: "Datos generales",
                  description: "Datos del proyecto",
                  content: (
                    <Container>
                      <SpaceBetween size="s">
                        <FormField
                          label="Título de la propuesta"
                          errorText={formErrors.titulo}
                          stretch
                        >
                          <Input
                            value={formValues.titulo}
                            onChange={({ detail }) =>
                              handleChange("titulo", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Línea de investigación del GI relacionado al equipamiento"
                          errorText={formErrors.linea}
                          stretch
                        >
                          <Select
                            placeholder="Escoja una opción"
                            selectedOption={formValues.linea}
                            onChange={({ detail }) =>
                              handleChange("linea", detail.selectedOption)
                            }
                            options={options}
                          />
                        </FormField>
                        <FormField
                          label="Resumen"
                          description="Indicar lo que se solicita, uso que se le dará y monto solicitado. Asimismo si el uso será solo para el GI o se compartirá, y si se usará solo en investigación o también en docencia (max 200 palabras)"
                          errorText={formErrors.resumen}
                          stretch
                        >
                          <Textarea
                            value={formValues.resumen}
                            onChange={({ detail }) =>
                              handleChange("resumen", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Justificación de la propuesta"
                          description="Explicar por qué lo solicitado influenciará positivamente en las actividades del GI y en sus proyectos o actividades específicas, detallando los casos. O en su defecto indicar por qué la carencia del equipo o de la adecuación impide o dificulta el funcionamiento del GI (max 200 palabras)"
                          errorText={formErrors.justificacion}
                          stretch
                        >
                          <Textarea
                            value={formValues.justificacion}
                            onChange={({ detail }) =>
                              handleChange("justificacion", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Propuesta de equipamiento científico"
                          description="Indicar las características del equipo(s) y como se incorporará en las actividades del GI (max 200 palabras)"
                          errorText={formErrors.propuesta}
                          stretch
                        >
                          <Textarea
                            value={formValues.propuesta}
                            onChange={({ detail }) =>
                              handleChange("propuesta", detail.value)
                            }
                          />
                        </FormField>
                      </SpaceBetween>
                    </Container>
                  ),
                },
                {
                  title: "Equipamiento",
                  description:
                    "Datos de equipamiento y documentos relacionados",
                },
                {
                  title: "Presupuesto",
                  description: "Montos y partidas",
                },
                {
                  title: "Impacto",
                  description:
                    "Impacto de la propuesta y documentos relacionados",
                },
                {
                  title: "Administración de equipamiento solicitado",
                  description:
                    "Administración de equipamiento solicitado y documentos relacionados",
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
