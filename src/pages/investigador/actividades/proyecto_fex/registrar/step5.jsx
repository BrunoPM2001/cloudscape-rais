import {
  Alert,
  Button,
  SpaceBetween,
  Wizard,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../../components/baseLayout";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Estudios",
  },
  {
    text: "Gestión de proyectos FEX",
  },
  {
    text: "Registrar",
    href: "../proyectos_fex",
  },
];

export default function Registrar_proyecto_fex_5() {
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

  const handleNavigate = (index) => {
    const query = queryString.stringify({
      id,
    });
    window.location.href = "paso" + (index + 1) + "?" + query;
  };

  const reporte = async () => {
    setLoadingReporte(true);
    const res = await axiosBase.get("investigador/actividades/fex/reporte", {
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
    const res = await axiosBase.post("investigador/actividades/fex/enviar", {
      id,
    });
    const info = res.data;
    pushNotification(info.detail, info.message, notifications.length + 1);
    setLoadingBtn(false);
    setTimeout(() => {
      window.location.href = "/investigador";
    }, 5000);
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Registrar o actualizar la información de un proyecto FEX."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={4}
        submitButtonText="Enviar"
        onSubmit={enviar}
        isLoadingNextStep={loadingBtn}
        onCancel={() => {
          window.location.href = "../proyectosFex";
        }}
        steps={[
          {
            title: "Datos básicos",
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Documentos",
          },
          {
            title: "Integrantes",
          },
          {
            title: "Envío de propuesta",
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
                  Declaro bajo juramento que toda la información consignada en
                  este formulario es verídica
                </Alert>
              </SpaceBetween>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
