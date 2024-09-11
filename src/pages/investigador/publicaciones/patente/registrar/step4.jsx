import {
  Alert,
  Box,
  Button,
  SpaceBetween,
  Spinner,
  Wizard,
} from "@cloudscape-design/components";
import BaseLayout from "../../../components/baseLayout.jsx";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios.js";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Publicaciones",
  },
  {
    text: "Patentes",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_patente_4() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  Url
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  //  States
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [data, setData] = useState();

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/propiedadInt/verificar4",
      {
        params: {
          id,
        },
      }
    );
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  const reporte = async () => {
    setLoadingReport(true);
    const res = await axiosBase.get(
      "investigador/publicaciones/utils/reporte",
      {
        params: {
          id,
          tipo: "patente",
        },
        responseType: "blob",
      }
    );
    setLoadingReport(false);
    const blob = res.data;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const enviar = async () => {
    setLoadingBtn(true);
    const res = await axiosBase.post(
      "investigador/publicaciones/propiedadInt/registrar4",
      {
        id,
      }
    );
    const info = res.data;
    pushNotification(info.detail, info.message, notifications.length + 1);
    setLoadingBtn(false);
    if (info.message == "success") {
      setTimeout(() => {
        window.location.href = "/investigador";
      }, 3000);
    }
  };

  const handleNavigate = (index) => {
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
              onCancel={() => {
                window.location.href = ".";
              }}
              onNavigate={({ detail }) =>
                handleNavigate(detail.requestedStepIndex)
              }
              activeStepIndex={3}
              isLoadingNextStep={loadingBtn}
              submitButtonText="Enviar patente"
              onSubmit={enviar}
              steps={[
                {
                  title: "Descripción de la propiedad intelectual",
                  description: "Metadata de la patente",
                },
                {
                  title: "Manejo de titulares",
                  description: "Listado de titulares",
                },
                {
                  title: "Autores de la patente",
                  description: "Listado de autores de esta patente",
                },
                {
                  title: "Envío de patente",
                  description: "Opciones finales",
                  content: (
                    <SpaceBetween size="m">
                      <Alert
                        header="Resumen de publicación"
                        action={
                          <Button
                            variant="primary"
                            loading={loadingReport}
                            onClick={reporte}
                          >
                            Previsualizar
                          </Button>
                        }
                      >
                        Si desea puede previsualizar el informe de resumen de su
                        publicación.
                      </Alert>
                      <Alert header="Declaración jurada">
                        Declara bajo juramento que toda información consignada
                        en este formulario es verídica.
                      </Alert>
                    </SpaceBetween>
                  ),
                },
              ]}
            />
          ) : (
            <Box margin={{ top: "m" }}>
              <Alert type="warning">Esta publicación no le pertenece</Alert>
            </Box>
          )}
        </>
      )}
    </BaseLayout>
  );
}
