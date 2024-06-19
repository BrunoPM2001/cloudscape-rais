import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso5 from "./paso5";
import { useContext, useState } from "react";
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

export default function Registrar_proyecto_paso5() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 0) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener 3 actividades registradas como mínimo",
          "warning",
          notifications.length + 1
        );
        return;
      }
      const query = queryString.stringify({
        proyecto_id: proyecto_id,
      });
      window.location.href = "paso6?" + query;
    } else {
      const query = queryString.stringify({
        proyecto_id,
      });
      window.location.href = "paso4?" + query;
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
      disableOverlap
      withoutContentLayout
    >
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={4}
        onCancel={() => {
          window.location.href = "../" + tipo;
        }}
        isLoadingNextStep={loading}
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
            description:
              "Actividades a desarrollar en el transcurso del proyecto",
            content: (
              <Paso5
                proyecto_id={proyecto_id}
                setRequisitos={setRequisitos}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Descripción del proyecto",
          },
          {
            title: "Financiamiento del proyecto",
          },
          {
            title: "Instrucciones finales",
          },
        ]}
      />
    </BaseLayout>
  );
}
