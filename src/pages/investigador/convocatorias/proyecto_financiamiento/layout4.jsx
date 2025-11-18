import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso4 from "./paso4";
import { useContext, useRef, useState } from "react";
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

export default function Registrar_proyecto_paso4() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Url
  const location = useLocation();
  const { proyecto_id } = queryString.parse(location.search);

  if (proyecto_id == null) {
    window.location.href = "paso1";
  }

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 3) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!isValid) {
        pushNotification(
          "Complete la información solicitada en todas las ventanas",
          "warning",
          notifications.length + 1
        );
        return;
      }
      const query = queryString.stringify({
        proyecto_id: proyecto_id,
      });
      window.location.href = "paso5?" + query;
    } else {
      const query = queryString.stringify({
        proyecto_id,
      });
      window.location.href = "paso3?" + query;
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
        activeStepIndex={3}
        isLoadingNextStep={loading}
        onCancel={() => {
          window.location.href = "../../";
        }}
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
            description: "Información específica del proyecto",
            content: (
              <Paso4
                ref={(el) => (pasoRefs.current[0] = el)}
                proyecto_id={proyecto_id}
              />
            ),
          },
          {
            title: "Calendario de actividades",
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
