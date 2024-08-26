import {
  Alert,
  Box,
  Container,
  FormField,
  SpaceBetween,
  Spinner,
  Table,
  Textarea,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useEffect, useState } from "react";
import { useFormValidation } from "../../../../hooks/useFormValidation.js";
import axiosBase from "../../../../api/axios.js";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Talleres de Investigación y Posgrado",
  },
];

const initialForm = {
  justificacion: "",
  objetivo: "",
  metas: "",
};

const formRules = {
  justificacion: { required: true },
  objetivo: { required: true },
  metas: { required: true },
};

export default function Convocatoria_registro_taller_3() {
  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar3"
    );
    const data = res.data;
    if (data.detalles) {
      handleChange("justificacion", data.detalles.justificacion);
      handleChange("objetivo", data.detalles.objetivo);
      handleChange("metas", data.detalles.metas);
    }
    setData(data);
    setLoading(false);
  };

  const handleNavigate = async (index) => {
    if (index == 3) {
      if (validateForm()) {
        setLoadingBtn(true);
        const res = await axiosBase.post(
          "investigador/convocatorias/pinvpos/registrar3",
          { ...formValues, id: data.datos.proyecto_id }
        );
        const info = res.data;
        window.location.href = "paso4";
        setLoadingBtn(false);
      }
    } else {
      window.location.href = "paso" + (index + 1);
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
    >
      {loading ? (
        <Box>
          <br />
          <Spinner /> Verificando información
        </Box>
      ) : (
        <>
          {data.estado ? (
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
                  title: "Información general del taller",
                  description: "Información general",
                },
                {
                  title: "Comité organizador del taller",
                  description: "Listado de integrantes para el taller",
                },
                {
                  title: "Plan de trabajo",
                  description: "Justificación, objetivos y metas",
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <div>
                          <Box variant="awsui-key-label">Título</Box>
                          <Box>
                            Líneas de investigación de los GI en el marco de los
                            Objetivos de Desarrollo Sostenible (ODS)
                          </Box>
                        </div>
                      </Container>
                      <FormField
                        label="Justificación"
                        errorText={formErrors.justificacion}
                        stretch
                      >
                        <Textarea
                          placeholder="Describa la justificación del taller"
                          value={formValues.justificacion}
                          onChange={({ detail }) =>
                            handleChange("justificacion", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Objetivos generales y específicos (según Anexo 1 - III B.)"
                        errorText={formErrors.objetivo}
                        stretch
                      >
                        <Textarea
                          placeholder="Describa los objetivos del taller"
                          value={formValues.objetivo}
                          onChange={({ detail }) =>
                            handleChange("objetivo", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Metas específicas"
                        errorText={formErrors.metas}
                        stretch
                      >
                        <Textarea
                          placeholder="Describa las metas del taller"
                          value={formValues.metas}
                          onChange={({ detail }) =>
                            handleChange("metas", detail.value)
                          }
                        />
                      </FormField>
                    </SpaceBetween>
                  ),
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
                {data.message.map((item) => {
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
