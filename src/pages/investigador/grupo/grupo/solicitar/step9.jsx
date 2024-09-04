import {
  Alert,
  Box,
  Button,
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

export default function Solicitar_grupo9() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [data, setData] = useState();

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/grupo/solicitar/verificar9", {
      params: {
        id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const enviar = async () => {
    setLoadingSend(true);
    const res = await axiosBase.post(
      "investigador/grupo/solicitar/registrar9",
      {
        id,
      }
    );
    const info = res.data;
    if (info.message == "success") {
      pushNotification(info.detail, info.message, notifications.length + 1);
    } else {
      pushNotification(info.detail, info.message, notifications.length + 1);
      setTimeout(() => {
        window.location.href = "/investigador";
      }, 5000);
    }
    setLoadingSend(false);
  };

  const reporte = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.get(
      "investigador/grupo/solicitar/reporteSolicitud",
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
    setLoadingBtn(false);
  };

  const siguiente = (index) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href = "paso" + (index + 1) + "?" + query;
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
              activeStepIndex={8}
              onNavigate={({ detail }) => siguiente(detail.requestedStepIndex)}
              isLoadingNextStep={loadingSend}
              onCancel={() => {
                window.location.href = "../";
              }}
              onSubmit={enviar}
              submitButtonText="Enviar solicitud"
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
                },
                {
                  title: "Envío de solicitud",
                  description: "Previsualización de solicitud",
                  content: (
                    <Alert
                      header="Declaración jurada"
                      action={
                        <Button
                          variant="primary"
                          loading={loadingBtn}
                          onClick={reporte}
                        >
                          Reporte
                        </Button>
                      }
                    >
                      Declaro bajo juramento que toda la información consignada
                      en este formulario es verídica
                    </Alert>
                  ),
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
