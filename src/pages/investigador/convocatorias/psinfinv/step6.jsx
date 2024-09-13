import {
  Alert,
  Box,
  Button,
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
    text: "Proyecto de investigación sin financiamiento",
  },
];

export default function Registro_psinfinv_5() {
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
      "investigador/convocatorias/psinfinv/verificar6",
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
      "investigador/convocatorias/psinfinv/reporte",
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
    setLoadingBtn(true);
    const res = await axiosBase.post(
      "investigador/convocatorias/psinfinv/enviar",
      {
        id,
      }
    );
    const info = res.data;
    pushNotification(info.detail, info.message, notifications.length + 1);
    setLoadingBtn(false);
    setTimeout(() => {
      window.location.href = "/investigador";
    }, 5000);
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
              activeStepIndex={5}
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
                  title: "Descripción del proyecto",
                  description: "Listado de detalles a completar",
                },
                {
                  title: "Responsable del proyecto",
                  description: "Datos del responsable",
                },
                {
                  title: "Integrantes",
                  description: "Listado de las actividades del taller",
                },
                {
                  title: "Calendario",
                  description: "Listado de actividades junto al responsable",
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
