import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../api/axios.js";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
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
    text: "Proyecto pconfigi innova",
  },
];

export default function Registro_pconfigi_inv_7() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [errors, setErrors] = useState([]);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi_inv/verificar7",
      {
        params: {
          id,
        },
      }
    );
    const info = res.data;
    if (!info.estado) {
      setErrors(info.errores);
    }
    setLoading(false);
  };

  const handleNavigate = (index) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href = "paso" + (index + 1) + "?" + query;
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/pconfigi_inv/reporte",
      {
        params: {
          id,
        },
        responseType: "blob",
      }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  const enviar = async () => {
    if (checked) {
      setLoadingBtn(true);
      const res = await axiosBase.post(
        "investigador/convocatorias/pconfigi_inv/enviar",
        {
          id,
        }
      );
      const info = res.data;
      pushNotification(info.detail, info.message, notifications.length + 1);
      setLoadingBtn(false);
      if (info.message == "info") {
        setTimeout(() => {
          window.location.href = "/investigador/convocatoria/pconfigi_inv";
        }, 5000);
      }
    } else {
      pushNotification(
        "Necesita aceptar los términos",
        "warning",
        notifications.length + 1
      );
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
              activeStepIndex={6}
              onCancel={() => {
                window.location.href = "../" + tipo;
              }}
              submitButtonText="Enviar propuesta"
              onSubmit={enviar}
              isLoadingNextStep={loadingBtn}
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
                  content: (
                    <SpaceBetween size="m">
                      <Container>
                        <SpaceBetween size="m">
                          <div>
                            Los docentes y/o estudiantes deben indicar, en cada
                            publicación o forma de divulgación (tesis,
                            artículos, libros, resúmenes de trabajos presentados
                            en congresos, páginas de internet y cualquier otra
                            publicación) que resulten del apoyo de la UNMSM, el
                            siguiente párrafo: Para los artículos escritos en
                            español: Esta investigación fue financiada por la
                            Universidad Nacional Mayor de San Marcos – RR N°
                            aabb-cc con código de proyecto dfgh. Para los
                            artículos escritos en algún idioma extranjero,
                            indicar el apoyo de la UNMSM en inglés: This
                            research was supported by the Universidad Nacional
                            Mayor de San Marcos – RR N° aabb-cc and project
                            number dfgh.
                          </div>
                          <Checkbox
                            checked={checked}
                            onChange={({ detail }) =>
                              setChecked(detail.checked)
                            }
                          >
                            Acepto
                          </Checkbox>
                        </SpaceBetween>
                      </Container>
                      <Alert
                        header="Declaración jurada"
                        action={
                          <Button
                            variant="primary"
                            loading={loadingReporte}
                            onClick={reporte}
                          >
                            Reporte
                          </Button>
                        }
                      >
                        Declaro bajo juramento que toda la información
                        consignada en este formulario es verídica
                      </Alert>
                    </SpaceBetween>
                  ),
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
