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
  objetivos: "",
  metas: "",
};

const formRules = {
  file: { required: true },
};

export default function Convocatoria_registro_taller_3() {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pinvpos/verificar2"
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const siguiente = async () => {
    if (validateForm()) {
      console.log("next");
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
              onNavigate={siguiente}
              activeStepIndex={1}
              isLoadingNextStep={loading}
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
                          value={formValues.justificacion}
                          onChange={({ detail }) =>
                            handleChange("justificacion", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Objetivos generales y específicos (según Anexo 1 - III B.)"
                        errorText={formErrors.objetivos}
                        stretch
                      >
                        <Textarea
                          value={formValues.objetivos}
                          onChange={({ detail }) =>
                            handleChange("objetivos", detail.value)
                          }
                        />
                      </FormField>
                      <FormField
                        label="Metas específicas"
                        errorText={formErrors.metas}
                        stretch
                      >
                        <Textarea
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
                  title: "Envío de publicación",
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
