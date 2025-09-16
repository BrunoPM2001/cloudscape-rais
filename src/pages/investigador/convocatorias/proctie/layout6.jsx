import { Wizard } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BaseLayout from "../../components/baseLayout";
import Paso6 from "./paso6";
import { useContext, useRef, useState } from "react";
import NotificationContext from "../../../../providers/notificationProvider";
import Info from "./components/info";

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

export default function Registrar_proyecto_paso6() {
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
  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 5) {
      if (!requisitos) {
        pushNotification(
          "Necesita tener al menos 1 partida registrada",
          "warning",
          notifications.length + 1
        );
        return;
      }
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.validarPresupuesto();
      setLoading(false);
      if (isValid) {
        const query = queryString.stringify({
          proyecto_id: proyecto_id,
        });
        window.location.href = "paso7?" + query;
      }
    } else {
      const query = queryString.stringify({
        proyecto_id,
      });
      window.location.href =
        "paso" + (detail.requestedStepIndex + 1) + "?" + query;
    }
  };

  return (
    <BaseLayout breadcrumbs={breadcrumbs} helpInfo={<Info />} disableOverlap>
      <Wizard
        onNavigate={({ detail }) => handleNavigate(detail)}
        activeStepIndex={5}
        onCancel={() => {
          window.location.href = "../../";
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
          },
          {
            title: "Financiamiento del proyecto",
            description: "Asignación de presupuesto a partidas",
            content: (
              <Paso6
                ref={(el) => (pasoRefs.current[0] = el)}
                proyecto_id={proyecto_id}
                setRequisitos={setRequisitos}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Instrucciones finales",
          },
        ]}
      />
    </BaseLayout>
  );
}
