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
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import { useFormValidation } from "../../../../../hooks/useFormValidation.js";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Grupo",
  },
  {
    text: "Solicitar",
  },
];

const initialForm = {
  nombre: "",
  doc_numero: "",
  codigo: "",
  tipo: "",
  dependencia: "",
  cti_vitae: "",
  google_scholar: "",
  codigo_orcid: "",
  //  Editable
  grado: null,
  titulo_profesional: "",
  especialidad: "",
  instituto_id: null,
  email3: "",
  telefono_casa: "",
  telefono_trabajo: "",
  telefono_movil: "",
};

const formRules = {
  grado: { required: true },
  titulo_profesional: { required: true },
  especialidad: { required: true },
  instituto_id: { required: true },
  email3: { required: true },
  telefono_casa: { required: true },
  telefono_trabajo: { required: true },
};

const optsGrado = [
  { value: "Bachiller" },
  { value: "Maestro" },
  { value: "Doctor" },
  { value: "Msci" },
  { value: "Phd" },
];

export default function Solicitar_grupo2() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState();

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm, setFormValues } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar2", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    if (data.datos) {
      setFormValues({
        ...data.datos,
        grado: { value: data.datos.grado },
        instituto_id: data.institutos.find(
          (opt) => data.datos.instituto_id == opt.value
        ),
        id,
      });
    }
    setLoading(false);
  };

  const siguiente = async (index) => {
    if (index == 2) {
      if (validateForm()) {
        setLoadingBtn(true);
        const res = await axiosBase.post(
          "investigador/grupo/solicitar/registrar2",
          formValues
        );
        const info = res.data;
        if (info.message == "success") {
          const query = queryString.stringify({
            id: info.id,
          });
          window.location.href = "paso3?" + query;
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
              onNavigate={({ detail }) => siguiente(detail.requestedStepIndex)}
              activeStepIndex={1}
              isLoadingNextStep={loadingBtn}
              onCancel={() => {
                window.location.href = "../";
              }}
              steps={[
                {
                  title: "Nombre del grupo",
                  description: "Nombre y nombre corto del GI",
                },
                {
                  title: "Coordinador del grupo",
                  description: "Datos del coordinador",
                  content: (
                    <SpaceBetween size="l">
                      <Container>
                        <ColumnLayout columns={3} borders="vertical">
                          <div>
                            <Box variant="awsui-key-label">
                              Nombres y apellidos
                            </Box>
                            <div>{formValues.nombre}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">N° de documento</Box>
                            <div>{formValues.doc_numero}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Código</Box>
                            <div>{formValues.codigo}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Categoría</Box>
                            <div>{formValues.tipo}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Dependencia</Box>
                            <div>{formValues.dependencia}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">
                              Puntaje en los últimos 7 años
                            </Box>
                            <div>{formValues.puntaje}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">CTI Vitae</Box>
                            <div>{formValues.cti_vitae}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Google Scholar</Box>
                            <div>{formValues.google_scholar}</div>
                          </div>
                          <div>
                            <Box variant="awsui-key-label">Código orcid</Box>
                            <div>{formValues.codigo_orcid}</div>
                          </div>
                        </ColumnLayout>
                      </Container>
                      <Container>
                        <ColumnLayout columns={2}>
                          <FormField
                            label="Grado"
                            errorText={formErrors.grado}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.grado}
                              onChange={({ detail }) =>
                                handleChange("grado", detail.selectedOption)
                              }
                              options={optsGrado}
                            />
                          </FormField>
                          <FormField
                            label="Título profesional"
                            errorText={formErrors.titulo_profesional}
                            stretch
                          >
                            <Input
                              value={formValues.titulo_profesional}
                              onChange={({ detail }) =>
                                handleChange("titulo_profesional", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Especialidad"
                            errorText={formErrors.especialidad}
                            stretch
                          >
                            <Input
                              value={formValues.especialidad}
                              onChange={({ detail }) =>
                                handleChange("especialidad", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Instituto de investigación"
                            errorText={formErrors.instituto_id}
                            stretch
                          >
                            <Select
                              placeholder="Escoja una opción"
                              selectedOption={formValues.instituto_id}
                              onChange={({ detail }) =>
                                handleChange(
                                  "instituto_id",
                                  detail.selectedOption
                                )
                              }
                              options={data.institutos}
                            />
                          </FormField>
                          <FormField
                            label="Correo institucional"
                            constraintText="La dirección de correo debe terminar en @unmsm.edu.pe, por ejemplo: investigador@unmsm.edu.pe"
                            errorText={formErrors.email3}
                            stretch
                          >
                            <Input
                              value={formValues.email3}
                              onChange={({ detail }) =>
                                handleChange("email3", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Teléfono de casa"
                            errorText={formErrors.telefono_casa}
                            stretch
                          >
                            <Input
                              value={formValues.telefono_casa}
                              onChange={({ detail }) =>
                                handleChange("telefono_casa", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Teléfono movil"
                            errorText={formErrors.telefono_movil}
                            stretch
                          >
                            <Input
                              value={formValues.telefono_movil}
                              onChange={({ detail }) =>
                                handleChange("telefono_movil", detail.value)
                              }
                            />
                          </FormField>
                          <FormField
                            label="Teléfono de trabajo"
                            errorText={formErrors.telefono_trabajo}
                            stretch
                          >
                            <Input
                              value={formValues.telefono_trabajo}
                              onChange={({ detail }) =>
                                handleChange("telefono_trabajo", detail.value)
                              }
                            />
                          </FormField>
                        </ColumnLayout>
                      </Container>
                    </SpaceBetween>
                  ),
                },
                {
                  title: "Integrantes del grupo",
                  description: "Miembros del grupo",
                },
                {
                  title: "Información del grupo de investigación",
                  description: "Detalles y líneas de investigación",
                },
                {
                  title: "Proyectos de investigación",
                  description:
                    "De los integrantes (proyectos de los últimos 7 años)",
                },
                {
                  title: "Resultados de investigación",
                  description:
                    "Publicaciones más relevantes de los integrantes",
                },
                {
                  title: "Infraestructura",
                  description: "Ambientes físicos y laboratorios",
                },
                {
                  title: "Datos de contacto",
                  description: "Deben corresponder al grupo",
                },
                {
                  title: "Envío de solicitud",
                  description: "Previsualización de solicitud",
                },
              ]}
            />
          ) : (
            <>
              <br />
              <Alert
                header="No puede solicitar la creación de un nuevo grupo"
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
