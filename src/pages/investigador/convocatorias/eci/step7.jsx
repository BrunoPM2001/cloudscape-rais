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
    text: "Proyecto de equipamiento científico",
  },
];

export default function Registro_eci_7() {
  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [errors, setErrors] = useState([]);

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/convocatorias/eci/verificar7",
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
    const res = await axiosBase.get("investigador/convocatorias/eci/reporte", {
      params: {
        id,
      },
      responseType: "blob",
    });
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setLoadingReporte(false);
  };

  const enviar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.post("investigador/convocatorias/eci/enviar", {
      id,
    });
    const info = res.data;
    pushNotification(info.detail, info.message, notifications.length + 1);
    setLoadingBtn(false);
    if (info.message == "info") {
      setTimeout(() => {
        window.location.href = "/investigador/convocatoria/eci";
      }, 5000);
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
                  title: "Información del grupo de investigación",
                  description: "Información general",
                },
                {
                  title: "Datos generales",
                  description: "Datos del proyecto",
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
                  content: (
                    <SpaceBetween size="m">
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
