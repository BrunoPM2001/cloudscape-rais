import {
  Alert,
  Box,
  ColumnLayout,
  Container,
  FormField,
  Input,
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
  telefono: "",
  anexo: "",
  oficina: "",
  direccion: "",
  email: "",
  web: "",
};

const formRules = {
  telefono: { required: true },
  anexo: { required: true },
  oficina: { required: true },
  direccion: { required: true },
  email: { required: true },
};

export default function Solicitar_grupo8() {
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
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar8", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    if (data.datos) {
      handleChange("anexo", data.datos.anexo);
      handleChange("direccion", data.datos.direccion);
      handleChange("email", data.datos.email);
      handleChange("oficina", data.datos.oficina);
      handleChange("telefono", data.datos.telefono);
      handleChange("web", data.datos.web);
      handleChange("id", id);
    }
    setLoading(false);
  };

  const siguiente = async (index) => {
    if (index == 8) {
      if (validateForm()) {
        setLoadingBtn(true);
        const res = await axiosBase.post(
          "investigador/grupo/solicitar/registrar8",
          formValues
        );
        const info = res.data;
        if (info.message == "success") {
          const query = queryString.stringify({
            id,
          });
          window.location.href = "paso9?" + query;
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
              activeStepIndex={7}
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
                  content: (
                    <Container>
                      <ColumnLayout columns={2}>
                        <FormField
                          label="Teléfono"
                          errorText={formErrors.telefono}
                          stretch
                        >
                          <Input
                            value={formValues.telefono}
                            onChange={({ detail }) =>
                              handleChange("telefono", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Anexo"
                          errorText={formErrors.anexo}
                          stretch
                        >
                          <Input
                            value={formValues.anexo}
                            onChange={({ detail }) =>
                              handleChange("anexo", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Oficina"
                          errorText={formErrors.oficina}
                          stretch
                        >
                          <Input
                            value={formValues.oficina}
                            onChange={({ detail }) =>
                              handleChange("oficina", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Dirección"
                          errorText={formErrors.direccion}
                          stretch
                        >
                          <Input
                            value={formValues.direccion}
                            onChange={({ detail }) =>
                              handleChange("direccion", detail.value)
                            }
                          />
                        </FormField>
                        <FormField
                          label="Correo del coordinador"
                          errorText={formErrors.email}
                          stretch
                        >
                          <Input disabled value={formValues.email} />
                        </FormField>
                        <FormField
                          label="Página web"
                          errorText={formErrors.web}
                          stretch
                        >
                          <Input
                            value={formValues.web}
                            onChange={({ detail }) =>
                              handleChange("web", detail.value)
                            }
                          />
                        </FormField>
                      </ColumnLayout>
                    </Container>
                  ),
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
