import { Wizard } from "@cloudscape-design/components";
import { useContext, useRef, useState } from "react";
import BaseLayout from "../../../components/baseLayout.jsx";
import Paso4 from "./paso4.jsx";
import NotificationContext from "../../../../../providers/notificationProvider.jsx";

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

export default function Solicitar_grupo4() {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [requisitos, setRequisitos] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Ref
  const pasoRefs = useRef([]);

  //  Functions
  const handleNavigate = async (detail) => {
    if (detail.requestedStepIndex > 1) {
      setLoading(true);
      const isValid = await pasoRefs.current[0]?.registrar();
      setLoading(false);
      if (!requisitos) {
        pushNotification(
          "Necesita tener al menos registrada 1 línea de investigación",
          "warning",
          notifications.length + 1
        );
        return;
      }
      if (isValid) {
        window.location.href = "paso" + (detail.requestedStepIndex + 1);
      }
    } else {
      window.location.href = "paso1";
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
          window.location.href = "/investigador";
        }}
        steps={[
          {
            title: "Nombre del grupo",
          },
          {
            title: "Coordinador del grupo",
          },
          {
            title: "Integrantes del grupo",
          },
          {
            title: "Información del grupo",
            description: "Datos del coordinador",
            content: (
              <Paso4
                ref={(el) => (pasoRefs.current[0] = el)}
                requisitos={requisitos}
                setRequisitos={setRequisitos}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            title: "Next",
          },
        ]}
      />
    </BaseLayout>
  );
}
