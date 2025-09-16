import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import { useContext, useState } from "react";
import Paso7 from "./paso7";
import axiosBase from "../../../../api/axios";
import NotificationContext from "../../../../providers/notificationProvider";

const breadcrumbs = [
  {
    text: "Investigador",
    href: "/investigador",
  },
  {
    text: "Convocatorias",
  },
  {
    text: "Registrar",
  },
];

export default function Registrar_proyecto_paso7() {
  //  States
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    const query = queryString.stringify({
      proyecto_id,
    });
    window.location.href =
      "paso" + (detail.requestedStepIndex + 1) + "?" + query;
  };

  const submit = async () => {
    setLoading(true);
    const res = await axiosBase.put(
      "investigador/convocatorias/pro-ctie/enviarProyecto",
      {
        proyecto_id,
      }
    );
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoading(false);
    if (data.message == "info") {
      setTimeout(() => {
        window.location.href = "/investigador";
      }, 5000);
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={6}
        onCancel={() => {
          window.location.href = "../../";
        }}
        onSubmit={submit}
        isLoadingNextStep={loading}
        submitButtonText="Enviar proyecto"
        steps={[
          {
            title: "Información general",
          },
          {
            title: "Asesor",
          },
          {
            title: "Integrantes del proyecto",
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Calendario de actividades",
          },
          {
            title: "Financiamiento del proyecto",
          },
          {
            title: "Instrucciones finales",
            description: "Envío de proyecto para evaluación",
            content: (
              <Paso7
                proyecto_id={proyecto_id}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
        ]}
      />
    </BaseLayout>
  );
}
